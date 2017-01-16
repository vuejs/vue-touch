import Vue from 'vue'

Vue.component('container', {
  props: ['state'],
  template: `
    <div class="container" :state="state">
      <slot></slot>
    </div>
  `,
})

Vue.component('rotator', {
  props: ['state'],
  template: `
    <container>
      <v-touch
        :enabled="state"
        @rotatestart="start"
        @rotate="rotate"
        @doubletap="reset"
        :rotate-options="{threshold: 15}"
        style="text-align: center; padding-top: 30px;" :style="rotated" class="rotator"
      >
        <slot></slot><br>
        This element is rotated {{rotation | round(2) }} deg<br>
        Double-tap to reset.
      </v-touch>
      {{$data}}
    </container>
  `,
  data() {
    return  {
      startRotation: 0,
      currentRotation: 0,
      rotation: 0,
      name: ''
    }
  },
  methods: {
    start(e) {
      this.startRotation = e.rotation < 0 ? 360 + e.rotaton : e.rotation
      this.name = e.type
    },
    rotate(e) {
      this.currentRotation = e.rotation < 0 ? 360 + e.rotation : e.rotation

    },
    reset() {
      this.currentRotation = 0
      this.startRotation = 0
    }
  },
  computed: {
    rotated() {
      const  { currentRotation: current, startRotation: start } = this.$data
      const real = current - start
      this.rotation = real
      return { transform: `rotate(${real}deg)` }
    }
  },
  filters: {
    round(n, dec = 0) {
      const f = Math.pow(10, dec)
      return Math.round(n * f) / f
    }
  }
})
