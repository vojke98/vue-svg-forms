<template>
<svg ref="slider" shape-rendering="geometricPrecision" :width="_width" :height="_options.dragger.radius*2" @mouseleave="mouseOn = false" @mouseup="mouseDown = false" @mousemove="handleMouseMove">
    <rect width="100%" height="100%" fill="black" fill-opacity="0" />

    <g @mousedown="handleClick" @mouseup="mouseDown = false">
        <rect ref="tracker" :x="_options.dragger.radius" :y="_posY" :width="_width-(_options.dragger.radius*2)" :height="_options.track.thickness" :fill="_options.track.background" :rx="_options.track.cornerRadius" />
        <rect :x="_options.dragger.radius" :y="_posY" :width="(_width-_options.dragger.radius*2)*newValue" :height="_options.track.thickness" :fill="_options.track.fill" :rx="_options.track.cornerRadius" />
    </g>

    <circle id="dragger" :class="mouseDown ? 'active' : ''" :cx="_options.dragger.radius+(_width-_options.dragger.radius*2)*newValue" :cy="_options.dragger.radius" :r="_options.dragger.radius-_options.dragger.strokeWidth/2" :fill="_options.dragger.fill" :stroke="_options.dragger.stroke" :stroke-width="_options.dragger.strokeWidth" cursor="pointer" @mousedown="mouseDown = true" @mouseup="mouseDown = false" :disabled="!_options.value.tooltip.show" v-b-tooltip.hover.dark :title="`${_range}${_options.value.tooltip.unit}`" />
</svg>
</template>

<script>
export default {
    name: 'Slider',
    props: {
        width: {
            type: [String, Number],
            default: 100
        },
        options: Object,
        value: {
            type: Number,
            default: 0
        }
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
            newValue: 0,
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
            const obj = this.mergeObjects(this.defaultOptions, this.options);
            return obj;
        },
        _posY() {
            return this._options.dragger.radius - (this._options.track.thickness / 2);
        },
        _range() {
            const max = this._options.value.max;
            const min = this._options.value.min;
            return (this.newValue * (max - min) + min).toFixed(this._options.value.tooltip.decimals);
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
                const step = this._options.value.step / (this._options.value.max - this._options.value.min);
                if (Math.abs(this.newValue - p) >= step / 2) this.newValue = Math.ceil(p / step) * step;
            }
        },
        isObject(item) {
            return (item && typeof item === 'object' && !Array.isArray(item));
        },
        mergeObjects(target, ...sources) {
            if (!sources.length) return target;
            const source = sources.shift();

            if (this.isObject(target) && this.isObject(source)) {
                for (const key in source) {
                    if (this.isObject(source[key])) {
                        if (!target[key]) Object.assign(target, {
                            [key]: {}
                        });
                        this.mergeObjects(target[key], source[key]);
                    } else {
                        Object.assign(target, {
                            [key]: source[key]
                        });
                    }
                }
            }

            return this.mergeObjects(target, ...sources);
        }
    },
    mounted() {
        this.slider = this.$refs["slider"];
        this.tracker = this.$refs["tracker"];

        const sliderBound = this.slider.getBoundingClientRect();
        const trackerBound = this.tracker.getBoundingClientRect();
        this.offset = trackerBound.left - sliderBound.left;
    }
}
</script>

<style scoped>
    #dragger.active {
        filter: brightness(3) saturate(.2) drop-shadow(0 0 4px black);
        transition: filter .2s;
    }
</style>
