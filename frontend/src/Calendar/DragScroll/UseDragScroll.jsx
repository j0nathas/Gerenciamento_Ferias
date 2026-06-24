import { useRef, useEffect } from 'react';

export default function useDragScroll() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;

        const onMouseDown = (e) => {
            isDragging = true;
            startX = e.pageX - el.offsetLeft;
            startY = e.pageY - el.offsetTop;
            scrollLeft = el.scrollLeft;
            scrollTop = el.scrollTop;
            el.style.cursor = 'grabbing';
            el.style.userSelect = 'none';
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const y = e.pageY - el.offsetTop;
            el.scrollLeft = scrollLeft - (x - startX);
            el.scrollTop = scrollTop - (y - startY);
        };

        const onMouseUp = () => {
            isDragging = false;
            el.style.cursor = 'grab';
            el.style.userSelect = '';
        };

        el.style.cursor = 'grab';
        el.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            el.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    return ref;
}