<template>
<svg ref="btnBody" class="btn" @click="$emit('click')" :style="{ color: enabled ? variants[variant][selected] : '#666', 'pointer-events': !enabled ? 'none' : ''}" :width="width" :height="height">
    <rect id="bg" width="100%" height="100%" :rx="width/20" :fill="_fill" />

    <text text-anchor="middle" :x="width/2" :y="height/2" alignment-baseline="middle">{{text}}</text>
</svg>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: {
            type: String,
            default: "Button",
        },
        variant: {
            type: String,
            default: "primary",
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
        width: {
            type: [String, Number],
            default: 100
        },
        height: {
            type: [String, Number],
            default: 50
        },
        fontSize: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            variants: {
                primary: {
                    enabled: {
                        fill: "#007bff",
                        text: "white"
                    },
                    disabled: {
                        fill: "#007bff",
                        text: "white"
                    }
                },
                secondary: {
                    enabled: {
                        fill: "#6c757d",
                        text: "white"
                    },
                    disabled: {
                        fill: "#6c757d",
                        text: "white"
                    }
                },
                success: {
                    enabled: {
                        fill: "#28a745",
                        text: "white"
                    },
                    disabled: {
                        fill: "#28a745",
                        text: "white"
                    }
                },
                danger: {
                    enabled: {
                        fill: "#dc3545",
                        text: "white"
                    },
                    disabled: {
                        fill: "#dc3545",
                        text: "white"
                    }
                },
                warning: {
                    enabled: {
                        fill: "#ffc107",
                        text: "#212529"
                    },
                    disabled: {
                        fill: "#ffc107",
                        text: "#212529"
                    }
                },
                info: {
                    enabled: {
                        fill: "#17a2b8",
                        text: "white"
                    },
                    disabled: {
                        fill: "#17a2b8",
                        text: "white"
                    }
                },
                light: {
                    enabled: {
                        fill: "#f8f9fa",
                        text: "#212529"
                    },
                    disabled: {
                        fill: "#f8f9fa",
                        text: "#212529"
                    }
                },
                dark: {
                    enabled: {
                        fill: "#343a40",
                        text: "white"
                    },
                    disabled: {
                        fill: "#343a40",
                        text: "white"
                    }
                }
            },

            bBox: undefined
        };
    },
    computed: {
        _fill() {
            const state = this.enabled ? 'enabled' : 'disabled';
            return this.variants[this.variant][state].fill;
        }
    },
    mounted() {
        const body = this.$refs["btnBody"];
        console.log(body)
        this.bBox = body.getBoundingClientRect();
    },
};
</script>

<style scoped>
.btn {
    cursor: pointer;
}

.btn:hover #bg {
    fill: blue;
}
</style>
