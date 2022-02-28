<template>
<svg ref="slider" shape-rendering="geometricPrecision" :width="_width" :height="_options.dragger.radius*2" @mouseup="mouseDown = false" style="overflow: visible">
    <rect width="100%" height="100%" fill="black" fill-opacity="0" />

    <g @mousedown="handleClick">
        <rect ref="tracker" :x="_options.dragger.radius" :y="_posY" :width="_width-(_options.dragger.radius*2)" :height="_options.track.thickness" :fill="_options.track.background" :rx="_options.track.cornerRadius" />
        <rect :x="_options.dragger.radius" :y="_posY" :width="(_width-_options.dragger.radius*2)*_normalizedValue" :height="_options.track.thickness" :fill="_options.track.fill" :rx="_options.track.cornerRadius" />
    </g>

    <circle id="dragger" :class="mouseDown ? 'active' : ''" :cx="_options.dragger.radius+(_width-_options.dragger.radius*2)*_normalizedValue" :cy="_options.dragger.radius" :r="_options.dragger.radius-_options.dragger.strokeWidth/2" :fill="_options.dragger.fill" :stroke="_options.dragger.stroke" :stroke-width="_options.dragger.strokeWidth" cursor="pointer" @mousedown="mouseDown = true" @mouseup="mouseDown = false" :disabled="!_options.value.tooltip.show" v-b-tooltip.hover.dark :title="`${(value || 0).toFixed(_options.value.tooltip.decimals)}${_options.value.tooltip.unit}`" />
</svg>
</template>

<script>
import { mergeObjects } from '../../helpers/mergeObjects.js';

export default {
    name: 'Slider',
    props: {
        width: {
            type: [String, Number],
            default: 100
        },
        options: Object
    },
    data() {
        return {
            defaultOptions: {
                dragger: {
                    radius: 10,
                    fill: "#007bff",
                    stroke: "white",
                    strokeWidth: 2,
                },
                track: {
                    thickness: 8,
                    cornerRadius: 3,
                    background: "#cccccc",
                    fill: "#007bff"
                },
                value: {
                    min: 0,
                    max: 100,
                    step: 1,
                    tooltip: {
                        show: true,
                        unit: "%",
                        decimals: 0
                    }
                },
            },

            mouseDown: false,
            mouseOn: false,
            value: undefined,
            slider: undefined,
            tracker: undefined,
            offset: undefined,
        }
    },
    computed: {
        _width() {
            return Number(this.width);
        },
        _options() {
            const obj = mergeObjects.deep(this.defaultOptions, this.options);
            return obj;
        },
        _posY() {
            return this._options.dragger.radius - (this._options.track.thickness / 2);
        },
        _normalizedValue() {
            const max = this._options.value.max;
            const min = this._options.value.min;
            return this.value ? (this.value - min) / (max - min) : 0;
        }
    },
    methods: {
        handleClick(e) {
            this.mouseDown = true;
            this.handleMouseMove(e);
        },
        handleMouseMove(e) {
            this.mouseOn = true;
            if (this.mouseDown) {
                const bound = this.slider.getBoundingClientRect();
                const x = e.clientX - bound.left - this.slider.clientLeft;
                const w = bound.width;

                let p = (x - this.offset) / (w - this.offset * 2);
                p = p < 0 ? 0 : (p > 1 ? 1 : p);

                const max = this._options.value.max;
                const min = this._options.value.min;
                p = p * (max - min) + min;
                const step = this._options.value.step // (this._options.value.max - this._options.value.min);
                if (Math.abs(this.value - p) >= step / 2) this.value = Math.ceil(p / step) * step;
            }
        }
    },
    mounted() {
        this.slider = this.$refs["slider"];
        this.tracker = this.$refs["tracker"];

        const sliderBound = this.slider.getBoundingClientRect();
        const trackerBound = this.tracker.getBoundingClientRect();
        this.offset = trackerBound.left - sliderBound.left;

        this.value = this._options.value.min;

        document.addEventListener('click', () => this.mouseDown = false);
        document.addEventListener('mousemove', e => this.handleMouseMove(e));
    },
    destroyed() {
        document.removeEventListener('click', () => this.mouseDown = false);
        document.removeEventListener('mousemove', e => this.handleMouseMove(e));
    }
}
</script>

<style scoped>
#dragger.active {
    filter: brightness(3) saturate(.2) drop-shadow(0 0 2px black);
    transition: filter .2s;
}
</style>
