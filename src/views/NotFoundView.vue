<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="backToHome">Back Home</a-button>
    </template>
  </a-result>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const backToHome = () => {
      router.push({ path: "/dashboard", replace: true });
    };

    return {
        backToHome
    }
  },
});
</script>
