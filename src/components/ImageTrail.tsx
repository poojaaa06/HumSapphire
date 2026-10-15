"use client";

/**
 * ImageTrail
 *
 * Images follow the pointer and leave a short animated trail. GSAP-powered,
 * 8 visual variants:
 *  1 Classic Lerp      2 Luminous Bloom   3 Ethereal Ascent  4 Motion Drift
 *  5 Angular Flow      6 Kinetic Blur     7 Depth Stack      8 3D Perspective
 *
 * Fill a positioned parent (it renders `w-full h-full`). Works with mouse and
 * touch; vertical page scroll still works on phones (`touch-pan-y`).
 */

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────  helpers  ───────────────────────────── */

type Point = { x: number; y: number };

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect): Point {
    let clientX = 0;
    let clientY = 0;
    if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
}

const getMouseDistance = (p1: Point, p2: Point) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

/* ─────────────────────────────  image item  ───────────────────────────── */

class ImageItem {
    public el: HTMLDivElement;
    public inner: HTMLDivElement | null;
    public rect: DOMRect;
    private onResize: () => void;

    constructor(el: HTMLDivElement) {
        this.el = el;
        this.inner = el.querySelector(".content__img-inner");
        this.rect = el.getBoundingClientRect();
        this.onResize = () => {
            gsap.set(this.el, { scale: 1, x: 0, y: 0, opacity: 0 });
            this.rect = this.el.getBoundingClientRect();
        };
        window.addEventListener("resize", this.onResize);
    }

    get w() {
        return this.rect.width;
    }
    get h() {
        return this.rect.height;
    }

    destroy() {
        window.removeEventListener("resize", this.onResize);
        gsap.killTweensOf(this.el);
        if (this.inner) gsap.killTweensOf(this.inner);
        gsap.set(this.el, { opacity: 0 });
    }
}

/* ─────────────────────────────  base class  ───────────────────────────── */

abstract class TrailBase {
    protected container: HTMLDivElement;
    protected images: ImageItem[];
    protected imagesTotal: number;
    protected imgPosition = 0;
    protected zIndexVal = 1;
    protected activeImagesCount = 0;
    protected isIdle = true;
    public threshold: number;
    protected mousePos: Point = { x: 0, y: 0 };
    protected lastMousePos: Point = { x: 0, y: 0 };
    protected cacheMousePos: Point = { x: 0, y: 0 };

    /** How quickly the "from" position chases the pointer (per frame). */
    protected lerpAmount = 0.1;
    /** true: ease the cached position before the distance check (original behaviour of variants 1,2,3,6,7,8). */
    protected lerpFirst = true;

    private rafId: number | null = null;
    private destroyed = false;
    private cleanups: Array<() => void> = [];

    constructor(container: HTMLDivElement, threshold: number) {
        this.container = container;
        this.threshold = threshold;
        this.images = Array.from(container.querySelectorAll<HTMLDivElement>(".content__img")).map(
            (el) => new ImageItem(el)
        );
        this.imagesTotal = this.images.length;

        const onMove = (ev: MouseEvent | TouchEvent) => {
            this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect());
        };

        // First movement boots the render loop; every movement updates the position.
        const onFirstMove = (ev: MouseEvent | TouchEvent) => {
            this.mousePos = getLocalPointerPos(ev, this.container.getBoundingClientRect());
            this.cacheMousePos = { ...this.mousePos };
            this.lastMousePos = { ...this.mousePos };
            container.removeEventListener("mousemove", onFirstMove as EventListener);
            container.removeEventListener("touchmove", onFirstMove as EventListener);
            this.queueRender();
        };

        container.addEventListener("mousemove", onMove as EventListener);
        container.addEventListener("touchmove", onMove as EventListener, { passive: true });
        container.addEventListener("mousemove", onFirstMove as EventListener);
        container.addEventListener("touchmove", onFirstMove as EventListener, { passive: true });

        this.cleanups.push(() => {
            container.removeEventListener("mousemove", onMove as EventListener);
            container.removeEventListener("touchmove", onMove as EventListener);
            container.removeEventListener("mousemove", onFirstMove as EventListener);
            container.removeEventListener("touchmove", onFirstMove as EventListener);
        });
    }

    protected abstract showNextImage(): void;

    protected easeCache() {
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, this.lerpAmount);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, this.lerpAmount);
    }

    protected render() {
        if (this.lerpFirst) this.easeCache();
        if (getMouseDistance(this.mousePos, this.lastMousePos) > this.threshold) {
            this.showNextImage();
            this.lastMousePos = { ...this.mousePos };
        }
        if (!this.lerpFirst) this.easeCache();
        if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
        this.queueRender();
    }

    protected queueRender() {
        if (this.destroyed) return;
        this.rafId = requestAnimationFrame(() => this.render());
    }

    protected nextImage(): ImageItem {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        gsap.killTweensOf(img.el);
        return img;
    }

    protected timeline() {
        return gsap.timeline({
            onStart: () => this.onImageActivated(),
            onComplete: () => this.onImageDeactivated(),
        });
    }

    protected onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }

    protected onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount <= 0) {
            this.activeImagesCount = 0;
            this.isIdle = true;
        }
    }

    public destroy() {
        this.destroyed = true;
        if (this.rafId !== null) cancelAnimationFrame(this.rafId);
        this.cleanups.forEach((fn) => fn());
        this.images.forEach((img) => img.destroy());
    }
}

/* ─────────────────────────────  variants  ───────────────────────────── */

/** 1 — Classic Lerp */
class Variant1 extends TrailBase {
    protected showNextImage() {
        const img = this.nextImage();
        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, scale: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
                { duration: 0.4, ease: "power1", x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2 },
                0
            )
            .to(img.el, { duration: 0.4, ease: "power3", opacity: 0, scale: 0.2 }, 0.4);
    }
}

/** 2 — Luminous Bloom */
class Variant2 extends TrailBase {
    protected showNextImage() {
        const img = this.nextImage();
        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
                { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2 },
                0
            )
            .fromTo(
                img.inner,
                { scale: 2.8, filter: "brightness(250%)" },
                { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%)" },
                0
            )
            .to(img.el, { duration: 0.4, ease: "power2", opacity: 0, scale: 0.2 }, 0.45);
    }
}

/** 3 — Ethereal Ascent */
class Variant3 extends TrailBase {
    protected showNextImage() {
        const img = this.nextImage();
        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, scale: 0, zIndex: this.zIndexVal, xPercent: 0, yPercent: 0, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
                { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2 },
                0
            )
            .to(
                img.el,
                { duration: 0.6, ease: "power2", opacity: 0, scale: 0.2, xPercent: () => gsap.utils.random(-30, 30), yPercent: -200 },
                0.6
            );
    }
}

/** 4 — Motion Drift */
class Variant4 extends TrailBase {
    protected lerpFirst = false;

    protected showNextImage() {
        const img = this.nextImage();
        let dx = this.mousePos.x - this.cacheMousePos.x;
        let dy = this.mousePos.y - this.cacheMousePos.y;
        const dist = Math.hypot(dx, dy);
        if (dist !== 0) {
            dx /= dist;
            dy /= dist;
        }
        dx *= dist / 100;
        dy *= dist / 100;
        const boost = Math.max((400 * dist) / 100, 100);

        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
                { duration: 0.4, ease: "power1", scale: 1, x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2 },
                0
            )
            .fromTo(
                img.inner,
                { scale: 2, filter: `brightness(${boost}%) contrast(${boost}%)` },
                { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%) contrast(100%)" },
                0
            )
            .to(img.el, { duration: 0.4, ease: "power3", opacity: 0 }, 0.4)
            .to(img.el, { duration: 1.5, ease: "power4", x: `+=${dx * 110}`, y: `+=${dy * 110}` }, 0.05);
    }
}

/** 5 — Angular Flow */
class Variant5 extends TrailBase {
    protected lerpFirst = false;
    private lastAngle = 0;

    protected showNextImage() {
        let dx = this.mousePos.x - this.cacheMousePos.x;
        let dy = this.mousePos.y - this.cacheMousePos.y;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        if (angle > 90 && angle <= 270) angle += 180;
        const isMovingClockwise = angle >= this.lastAngle;
        this.lastAngle = angle;
        const startAngle = isMovingClockwise ? angle - 10 : angle + 10;
        const dist = Math.hypot(dx, dy);
        if (dist !== 0) {
            dx /= dist;
            dy /= dist;
        }
        dx *= dist / 150;
        dy *= dist / 150;

        const img = this.nextImage();
        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, filter: "brightness(80%)", scale: 0.1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2, rotation: startAngle },
                { duration: 1, ease: "power2", scale: 1, filter: "brightness(100%)", x: this.mousePos.x - img.w / 2 + dx * 70, y: this.mousePos.y - img.h / 2 + dy * 70, rotation: this.lastAngle },
                0
            )
            .to(img.el, { duration: 0.4, ease: "expo", opacity: 0 }, 0.5)
            .to(img.el, { duration: 1.5, ease: "power4", x: `+=${dx * 120}`, y: `+=${dy * 120}` }, 0.05);
    }
}

/** 6 — Kinetic Blur */
class Variant6 extends TrailBase {
    protected lerpAmount = 0.3;

    protected showNextImage() {
        const speed = Math.hypot(this.mousePos.x - this.cacheMousePos.x, this.mousePos.y - this.cacheMousePos.y);
        const img = this.nextImage();

        const scaleFactor = 0.3 + 1.7 * Math.min(speed / 200, 1);
        const brightnessValue = 1 + 0.3 * Math.min(speed / 70, 1);
        const blurValue = 20 * (1 - Math.min(speed / 90, 1));
        const grayscaleValue = 1 * (1 - Math.min(speed / 90, 1));

        this.timeline()
            .fromTo(
                img.el,
                { opacity: 1, scale: 0, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
                {
                    duration: 0.8,
                    ease: "power3",
                    scale: scaleFactor,
                    filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
                    x: this.mousePos.x - img.w / 2,
                    y: this.mousePos.y - img.h / 2,
                },
                0
            )
            .to(img.el, { duration: 0.4, ease: "power3.in", opacity: 0, scale: 0.2 }, 0.45);
    }
}

/** 7 — Depth Stack */
class Variant7 extends TrailBase {
    protected lerpAmount = 0.3;
    private visibleImagesCount = 0;
    private visibleImagesTotal = 9;

    protected showNextImage() {
        const img = this.nextImage();
        ++this.visibleImagesCount;
        const scaleValue = gsap.utils.random(0.5, 1.6);

        this.timeline().fromTo(
            img.el,
            { scale: scaleValue - 0.4, rotationZ: 0, opacity: 1, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2 },
            { duration: 0.4, ease: "power3", scale: scaleValue, rotationZ: gsap.utils.random(-3, 3), x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2 },
            0
        );

        if (this.visibleImagesCount >= this.visibleImagesTotal) {
            const lastInQueue = (this.imgPosition - this.visibleImagesTotal + this.imagesTotal) % this.imagesTotal;
            gsap.to(this.images[lastInQueue].el, { duration: 0.4, ease: "power4", opacity: 0, scale: 1.3 });
        }
    }
}

/** 8 — 3D Perspective */
class Variant8 extends TrailBase {
    protected showNextImage() {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const relX = this.mousePos.x - centerX;
        const relY = this.mousePos.y - centerY;

        const rotX = -(relY / centerY) * 30;
        const rotY = (relX / centerX) * 30;
        const distFromCenter = Math.hypot(relX, relY);
        const maxDist = Math.hypot(centerX, centerY);
        const zValue = (distFromCenter / maxDist) * 1200 - 600;
        const brightness = 0.2 + ((zValue + 600) / 1200) * 2.3;

        const img = this.nextImage();
        this.timeline()
            .set(this.container, { perspective: 1000 })
            .fromTo(
                img.el,
                { opacity: 1, z: 0, scale: 1 + zValue / 1000, zIndex: this.zIndexVal, x: this.cacheMousePos.x - img.w / 2, y: this.cacheMousePos.y - img.h / 2, rotationX: rotX, rotationY: rotY, filter: `brightness(${brightness})` },
                { duration: 1, ease: "expo", scale: 1 + zValue / 1000, x: this.mousePos.x - img.w / 2, y: this.mousePos.y - img.h / 2, rotationX: rotX, rotationY: rotY },
                0
            )
            .to(img.el, { duration: 0.4, ease: "power2", opacity: 0, z: -800 }, 0.3);
    }
}

const variantMap: Record<number, new (container: HTMLDivElement, threshold: number) => TrailBase> = {
    1: Variant1,
    2: Variant2,
    3: Variant3,
    4: Variant4,
    5: Variant5,
    6: Variant6,
    7: Variant7,
    8: Variant8,
};

/* ─────────────────────────────  component  ───────────────────────────── */

export interface ImageTrailProps {
    /** Image URLs to trail */
    items: string[];
    /** Animation variant (1–8) */
    variant?: number;
    /** Distance in px the pointer must travel before the next image appears */
    threshold?: number;
    className?: string;
}

export function ImageTrail({ items = [], variant = 1, threshold = 80, className = "" }: ImageTrailProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || items.length === 0) return;

        const Cls = variantMap[variant] ?? variantMap[1];
        const instance = new Cls(el, threshold);
        return () => instance.destroy();
    }, [variant, items, threshold]);

    return (
        <div
            ref={containerRef}
            className={`relative z-10 h-full w-full touch-pan-y overflow-visible bg-transparent ${className}`}
        >
            {items.map((url, i) => (
                <div
                    key={`${url}-${i}`}
                    aria-hidden="true"
                    className="content__img pointer-events-none absolute left-0 top-0 aspect-[1.1] w-[130px] overflow-hidden rounded-[6px] opacity-0 shadow-2xl [will-change:transform,filter] sm:w-[190px]"
                >
                    <div
                        className="content__img-inner absolute left-[-10px] top-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] bg-cover bg-center"
                        style={{ backgroundImage: `url(${url})` }}
                    />
                </div>
            ))}
        </div>
    );
}

export default ImageTrail;