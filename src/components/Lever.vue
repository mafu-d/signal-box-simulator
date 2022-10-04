<template>
  <div class="lever" :data-type="type" :data-reversed="state == 1">
    <div class="lever__number">
      {{ id }}
    </div>
    <div class="lever__label" v-if="typeof label == 'object'">
      <span v-for="(labelPart, index) in label" :key="index">
        {{ labelPart }}
      </span>
    </div>
    <div class="lever__label" v-else>
      {{ label }}
    </div>
    <div class="lever__locks">
      <div class="lever__unlocked-by" v-if="unlockedByList.length">
        {{ unlockedByList.join(", ") }}
      </div>
      <div class="lever__locked-by" v-if="lockedByList.length">
        {{ lockedByList.join(", ") }}
      </div>
    </div>
    <div class="lever__switch">
      <input
        type="range"
        min="0"
        max="1"
        step="1"
        v-model="state"
        @change="changeState"
        :disabled="!unlocked"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    label: [String, Object],
    type: String,
    unlockedBy: Object,
    unlocked: Boolean,
  },

  data() {
    return {
      state: 0,
    };
  },

  methods: {
    changeState() {
      this.$emit("changeState", { id: this.id, newState: this.state == 1 });
    },
  },

  computed: {
    unlockedByList() {
      const locks = [];
      for (const id in this.unlockedBy) {
        if (this.unlockedBy[id]) {
          locks.push(id);
        }
      }
      return locks;
    },
    lockedByList() {
      const locks = [];
      for (const id in this.unlockedBy) {
        if (!this.unlockedBy[id]) {
          locks.push(id);
        }
      }
      return locks;
    },
  },
};
</script>

<style lang="scss">
.lever {
  display: grid;
  grid-template-rows: max-content auto max-content max-content;
  gap: 1rem;
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  color: white;

  &[data-type="signal"] {
    background: var(--signal);
    --color: var(--signal);
  }

  &[data-type="point"] {
    background: var(--point);
    --color: var(--point);
  }

  &[data-type="fpl"] {
    background: var(--fpl);
    --color: var(--fpl);
  }

  &[data-reversed="true"] {
    box-shadow: var(--color) 0 1rem 0 0;
  }

  &__number {
    font-size: 2rem;
  }

  &__label {
    font-size: 0.8rem;

    span {
      display: block;
    }

    span + span {
      border-top: 1px solid white;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
    }
  }

  &__locks {
    display: grid;
    gap: 1rem;
  }

  &__unlocked-by {
    margin-top: 1rem;
  }

  &__unlocked-by + &__locked-by::before {
    width: 100%;
    border-top: 1px solid rgb(255 255 255 / 0.5);
    padding-top: 1rem;
  }

  &__locked-by::before {
    content: "Put back";
    font-size: 0.6rem;
  }

  &__unlocked-by,
  &__locked-by {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    span {
      & + & {
        padding-left: 1rem;
      }

      &[data-state="false"] {
        &::before {
          content: "(";
        }
        &::after {
          content: ")";
        }
      }
    }
  }

  &__switch {
    input {
      appearance: slider-vertical;
      transform: rotate(180deg);
      width: 3rem;

      &[disabled] {
        opacity: 0.3;
      }
    }
  }
}
</style>
