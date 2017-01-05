import Vue from 'vue'

Vue.component('container', {
  template: `
    <div class="container">
      <slot></slot>
    </div>
  `,
})

Vue.component('rotator', {
  template: `
    <container>
      <v-touch @rotate="cb" :rotate-options="{threshold: 15}" :style="rotated" class="rotator">
        <slot></slot>
        {{name || 'NoEvent'}} - {{angle}}deg, {{rotation}}
      </v-touch>
    </container>
  `,
  data() {
    return  {
      angle: 0,
      rotation: 0,
      initialRotation: 0,
      name: ''
    }
  },
  methods: {
    cb(event) {
      console.log('rotate', event)
      if (event.isFirst) { this.initialRotation = event.rotation }
      else {
        const newRotation = Math.round(event.rotation - this.initialRotation)

        this.rotation = this.rotation = newRotation
      }
      this.angle = Math.round(event.angle)
      this.name = event.type
    }
  },
  computed: {
    rotated() {
      return { transform: `rotate(${this.rotation}deg)` }
    }
  }
})
