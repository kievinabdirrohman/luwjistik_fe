<template>
  <a-form
    :model="formState"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    :loading="loading"
    layout='vertical'
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      username: "",
      password: "",
      remember: false,
    });
    const router = useRouter();
    const loading = ref(false);

    const onFinish = async (values: any) => {
      try {
        loading.value = true;

        const response = await fetch(
          "https://fe-screening.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: values.username,
              password: values.password,
            }),
          }
        );

        const data = await response.json();

        sessionStorage.setItem("session_token", data.session);
        router.push({ path: "/dashboard", replace: true });
      } catch (error) {
        message.error(`Request failed with status ${error}`);
      } finally {
        loading.value = false;
      }
    };
    return {
      formState,
      onFinish,
      loading
    };
  },
});
</script>
