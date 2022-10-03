<template>
  <div class="signal-box">
    <Diagram class="diagram" />
    <div class="frame">
      <Lever
        v-for="lever in levers"
        :key="lever.id"
        :id="lever.id"
        :label="lever.label"
        :type="lever.type"
        :unlockedBy="lever.unlockedBy"
        :unlocked="lever.unlocked"
        @changeState="stateChanged"
      />
    </div>
  </div>
</template>

<script>
import Lever from "./components/Lever.vue";
import Diagram from "./diagram.svg";

export default {
  components: {
    Lever,
    Diagram,
  },

  methods: {
    stateChanged({ id, newState }) {
      this.levers.find((lever) => lever.id === id).state = newState;
      this.setLockState();
    },

    setLockState() {
      this.levers.forEach((lever) => {
        lever.unlocked = true;
        if (!lever.unlockedBy) return;
        for (const conditionId in lever.unlockedBy) {
          if (
            this.levers.find(
              (conditionLever) => conditionLever.id == conditionId
            ).state != lever.unlockedBy[conditionId]
          ) {
            lever.unlocked = false;
            return;
          }
        }
      });
    },
  },

  mounted() {
    this.setLockState();
  },

  data() {
    return {
      levers: [
        {
          id: 1,
          unlocked: true,
          state: 0,
          label: "Up Ptfm 2 Start",
          type: "signal",
          unlockedBy: { 5: 0, 10: 1, 12: 0 },
        },
        {
          id: 2,
          unlocked: true,
          state: 0,
          label: "Up Ptfm 1 Start",
          type: "signal",
          unlockedBy: { 8: 0, 13: 0, 15: 0, 16: 0 },
        },
        {
          id: 3,
          unlocked: true,
          state: 0,
          label: "Up Adv Start",
          type: "signal",
          unlockedBy: { 17: 0 },
        },
        {
          id: 4,
          unlocked: true,
          state: 0,
          label: "Up Goods Siding Disc",
          type: "signal",
          unlockedBy: { 5: 1, 10: 1, 12: 0 },
        },
        {
          id: 5,
          unlocked: true,
          state: 0,
          label: ["Ptfm 2", "Goods Siding"],
          type: "point",
          unlockedBy: { 6: 0, 1: 0, 4: 0 },
        },
        {
          id: 6,
          unlocked: true,
          state: 0,
          label: "FPL for 5",
          type: "fpl",
          unlockedBy: { 12: 0, 16: 0 },
        },
        {
          id: 7,
          unlocked: true,
          state: 0,
          label: "Up Loop Disc",
          type: "signal",
          unlockedBy: { 8: 1, 13: 0 },
        },
        {
          id: 8,
          unlocked: true,
          state: 0,
          label: ["Ptfm 1", "Loop"],
          type: "point",
          unlockedBy: { 9: 0, 7: 0, 2: 0 },
        },
        {
          id: 9,
          unlocked: true,
          state: 0,
          label: "FPL for 8",
          type: "fpl",
          unlockedBy: { 15: 0 },
        },
        {
          id: 10,
          unlocked: true,
          state: 0,
          label: "FPL for 13B",
          type: "fpl",
          unlockedBy: { 1: 0, 4: 0 },
        },
        {
          id: 11,
          unlocked: true,
          state: 0,
          label: "Down Shed Catch",
          type: "point",
          unlockedBy: { 13: 0, 12: 0 },
        },
        {
          id: 12,
          unlocked: true,
          state: 0,
          label: "Down Shed Disc",
          type: "signal",
          unlockedBy: { 11: 1, 13: 0, 6: 1, 1: 0, 4: 0 },
        },
        {
          id: 13,
          unlocked: true,
          state: 0,
          label: ["Main", "Sidings"],
          type: "point",
          unlockedBy: { 14: 0, 10: 0, 7: 0, 12: 0, 2: 0 },
        },
        {
          id: 14,
          unlocked: true,
          state: 0,
          label: "FPL for 13A",
          type: "fpl",
          unlockedBy: { 15: 0, 16: 0 },
        },
        {
          id: 15,
          unlocked: true,
          state: 0,
          label: "Down Ptfm 1 Inner Home",
          type: "signal",
          unlockedBy: { 14: 1, 13: 0, 9: 1, 2: 0, 7: 0 },
        },
        {
          id: 16,
          unlocked: true,
          state: 0,
          label: "Down Ptfm 2 Inner Home",
          type: "signal",
          unlockedBy: { 14: 1, 13: 1, 6: 1, 7: 0 },
        },
        {
          id: 17,
          unlocked: true,
          state: 0,
          label: "Down Main Home",
          type: "signal",
          unlockedBy: { 3: 0, 2: 0, 7: 0 },
        },
      ],
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

:root {
  --signal: #d00;
  --point: #200;
  --fpl: #00e;
}

body {
  font-family: "Lato", sans-serif;
}

.frame {
  display: grid;
  grid-template-columns: repeat(17, 1fr);
  /* flex-wrap: wrap; */
  gap: 1px;
}

.diagram {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}
</style>
