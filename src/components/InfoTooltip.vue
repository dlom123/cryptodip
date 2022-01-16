<template>
  <v-tooltip
    :top="tooltipPositionTop"
    :right="tooltipPositionRight"
    :bottom="tooltipPositionBottom"
    :left="tooltipPositionLeft"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        :size="iconSize || 'small'"
        :color="iconColor"
        v-bind="attrs"
        v-on="on"
        >{{ icon }}</v-icon
      >
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
    name: "InfoTooltip",
    props: [
        "icon",
        "iconColor",
        "iconSize",
        "position",
        "text"
    ],
    computed: {
        tooltipPositionTop() {
            return this.position == "top"
        },
        tooltipPositionRight() {
            return this.position == "right"
        },
        tooltipPositionBottom() {
            return this.position == "bottom"
        },
        tooltipPositionLeft() {
            return this.position == "left"
        }
    }
}
</script>
