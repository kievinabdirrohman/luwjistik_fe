<template>
  <h2>Order List</h2>
  <br/>
  <div>
    <a-button type="primary" @click="visible = true">New Order</a-button>
    <a-modal
      v-model:visible="visible"
      title="Place New Order"
      :confirm-loading="confirmLoading"
      ok-text="Create"
      cancel-text="Cancel"
      @ok="onOk"
      width="fit-content"
    >
      <a-form
        ref="formRef"
        :model="formState"
        layout="vertical"
        name="form_in_modal"
      >
        <a-form-item
          name="consigneeName"
          label="Consigneed Name"
          :rules="[
            { required: true, message: 'Please input the Consigneed Name' },
          ]"
        >
          <a-input v-model:value="formState.consigneeName" allow-clear />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              name="consigneeCountry"
              label="Consigneed Country"
              :rules="[
                {
                  required: true,
                  message: 'Please input the Consigneed Country',
                },
              ]"
            >
              <a-select
                v-model:value="formState.consigneeCountry"
                show-search
                placeholder="Select Country"
                :options="countryOptions"
                :filter-option="filterOption"
                allow-clear
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="consigneeProvince"
              label="Consigneed Province"
              :rules="[
                {
                  required: true,
                  message: 'Please input the Consigneed Province',
                },
              ]"
            >
              <a-select
                v-model:value="formState.consigneeProvince"
                show-search
                placeholder="Select Province"
                :options="provinceAndCityOptions"
                :filter-option="filterOption"
                allow-clear
              ></a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="consigneeCity"
              label="Consigneed City"
              :rules="[
                { required: true, message: 'Please input the Consigneed City' },
              ]"
            >
              <a-select
                v-model:value="formState.consigneeCity"
                show-search
                placeholder="Select City"
                :options="provinceAndCityOptions"
                :filter-option="filterOption"
                allow-clear
              ></a-select> </a-form-item
          ></a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              name="consigneePostalCode"
              label="Consigneed Postal Code"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'Please input numeric value',
                },
              ]"
            >
              <a-input
                v-model:value="formState.consigneePostalCode"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="consigneeNumber"
              label="Consigneed Number"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'Please input numeric value',
                },
              ]"
            >
              <a-input v-model:value="formState.consigneeNumber" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              name="paymentType"
              label="Payment Type"
              :rules="[
                { required: true, message: 'Please input the Payment Type' },
              ]"
            >
              <a-select
                v-model:value="formState.paymentType"
                placeholder="Select Payment Type"
                :options="paymentTypeOptions"
                allow-clear
              ></a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item
          name="consigneeAddress"
          label="Consigneed Address"
          :rules="[
            { required: true, message: 'Please input the Consigneed Address' },
          ]"
        >
          <a-textarea v-model:value="formState.consigneeAddress" allow-clear />
        </a-form-item>

        <a-row>
          <a-col :span="6">
            <a-form-item
              name="height"
              label="Height"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'must be greater than 0',
                },
              ]"
            >
              <a-input-number v-model:value="formState.height" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              name="weight"
              label="Weight"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'must be greater than 0',
                },
              ]"
            >
              <a-input-number v-model:value="formState.weight" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              name="length"
              label="Length"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'must be greater than 0',
                },
              ]"
            >
              <a-input-number v-model:value="formState.length" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item
              name="width"
              label="Width"
              :rules="[
                {
                  required: true,
                  validator: checkNumericInput,
                  message: 'must be greater than 0',
                },
              ]"
            >
              <a-input-number v-model:value="formState.width" allow-clear />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <br/><br/>
    <a-table
      :columns="orderColumns"
      :data-source="orderData"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === 'Consignee Country'">
          {{
            record.ConsigneeCountry === "ID"
              ? "Indonesia"
              : record.ConsigneeCountry === "SG"
              ? "Singapore"
              : "Malaysia"
          }}
        </template>
        <template v-if="column.title === 'Payment Type'">
          {{ record.PaymentType === "cod" ? "Cash On Delivery" : "Prepaid" }}
        </template>
      </template>
    </a-table>
    <br/><br/>
    <a-button type="primary" @click="logout">Logout</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import type { Rule } from "ant-design-vue/es/form";
import type { FormInstance, SelectProps } from "ant-design-vue";
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";

interface Values {
  consigneeName: string;
  consigneeAddress: string;
  consigneeCity: string;
  consigneeCountry: string;
  consigneePostalCode: string;
  consigneeProvince: string;
  consigneeNumber: string;
  height: number;
  weight: number;
  length: number;
  width: number;
  paymentType: string;
  TrackingNumber?: number;
}

interface autoCompleteOptions {
  value: string;
}

export default defineComponent({
  setup() {
    let orderData = ref<Values[]>([]);

    const session_token = sessionStorage.getItem("session_token") ?? '';
    const router = useRouter();
    const formRef = ref<FormInstance>();
    const visible = ref<boolean>(false);
    const confirmLoading = ref<boolean>(false);
    const formState = reactive<Values>({
      consigneeName: "",
      consigneeAddress: "",
      consigneeCity: "",
      consigneeCountry: "",
      consigneePostalCode: "",
      consigneeProvince: "",
      consigneeNumber: "",
      height: 0,
      weight: 0,
      length: 0,
      width: 0,
      paymentType: "",
    });
    const countryOptions = ref<SelectProps["options"]>([
      { value: "ID", label: "Indonesia" },
      { value: "SG", label: "Singapore" },
      { value: "MY", label: "Malaysia" },
    ]);
    const provinceAndCityOptions = ref<SelectProps["options"]>([
      { value: "Jakarta", label: "Jakarta" },
      { value: "Singapore", label: "Singapore" },
      { value: "Johor", label: "Johor" },
    ]);
    const paymentTypeOptions = ref<SelectProps["options"]>([
      { value: "cod", label: "Cash On Delivery (COD)" },
      { value: "prepaid", label: "Prepaid" },
    ]);
    const orderColumns = [
      {
        title: "Tracking Number",
        dataIndex: "TrackingNumber",
        key: "TrackingNumber",
        sorter: (a: any, b: any) =>
          a.TrackingNumber.length - b.TrackingNumber.length,
      },
      {
        title: "Consignee Name",
        dataIndex: "ConsigneeName",
        key: "ConsigneeName",
        sorter: (a: any, b: any) =>
          a.ConsigneeName.length - b.ConsigneeName.length,
      },
      {
        title: "Consignee Address",
        dataIndex: "ConsigneeAddress",
        key: "ConsigneeAddress",
        sorter: (a: any, b: any) =>
          a.ConsigneeAddress.length - b.ConsigneeAddress.length,
      },
      {
        title: "Consignee Country",
        dataIndex: "ConsigneeCountry",
        key: "ConsigneeCountry",
        sorter: (a: any, b: any) =>
          a.ConsigneeCountry.length - b.ConsigneeCountry.length,
      },
      {
        title: "Consignee Province",
        dataIndex: "ConsigneeProvince",
        key: "ConsigneeProvince",
        sorter: (a: any, b: any) =>
          a.ConsigneeProvince.length - b.ConsigneeProvince.length,
      },
      {
        title: "Consignee City",
        dataIndex: "ConsigneeCity",
        key: "ConsigneeCity",
        sorter: (a: any, b: any) =>
          a.ConsigneeCity.length - b.ConsigneeCity.length,
      },
      {
        title: "Consignee Postal Code",
        dataIndex: "ConsigneePostalCode",
        key: "ConsigneePostalCode",
        sorter: (a: any, b: any) =>
          a.ConsigneePostalCode.length - b.ConsigneePostalCode.length,
      },
      {
        title: "Consignee Number",
        dataIndex: "ConsigneeNumber",
        key: "ConsigneeNumber",
        sorter: (a: any, b: any) =>
          a.ConsigneeNumber.length - b.ConsigneeNumber.length,
      },
      {
        title: "Height",
        dataIndex: "Height",
        key: "Height",
        sorter: (a: any, b: any) => a.Height.length - b.Height.length,
      },
      {
        title: "Weight",
        dataIndex: "Weight",
        key: "Weight",
        sorter: (a: any, b: any) => a.Weight.length - b.Weight.length,
      },
      {
        title: "Length",
        dataIndex: "Length",
        key: "Length",
        sorter: (a: any, b: any) => a.Length.length - b.Length.length,
      },
      {
        title: "Width",
        dataIndex: "Width",
        key: "Width",
        sorter: (a: any, b: any) => a.Width.length - b.Width.length,
      },
      {
        title: "Payment Type",
        dataIndex: "PaymentType",
        key: "PaymentType",
        sorter: (a: any, b: any) => a.PaymentType.length - b.PaymentType.length,
      },
    ];

    const headers = new Headers();
    headers.append("Authorization", session_token);
    headers.append("Content-Type", "application/json");

    const filterOption = (input: string, option: any) => {
      return option.value.toUpperCase().indexOf(input.toUpperCase()) >= 0;
    };

    let checkNumericInput = async (_rule: Rule, value: number) => {
      if (!value) {
        return Promise.reject("Please input valid value");
      }
      if (isNaN(value)) {
        return Promise.reject("Please input digits");
      }
    };

    const getOrderData = () => {
      const url_get_order = "https://fe-screening.onrender.com/orders";

      fetch(url_get_order, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          orderData.value = data.data ?? [];
        })
        .catch((error) => {
          message.error(error);
        });
    };

    getOrderData();

    const onOk = () => {
      confirmLoading.value = true;

      formRef?.value!
        .validateFields()
        .then((values) => {
          fetch("https://fe-screening.onrender.com/orders", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              orderData?.value?.push(data.data);
              visible.value = false;
              formRef?.value!.resetFields();
              message.success('Successfully Added Order');
            })
            .catch((error) => {
              message.error(error);
            });
        })
        .catch()
        .finally(() => {
          confirmLoading.value = false;
        });
    };

    const logout = () => {
      sessionStorage.removeItem("session_token");
      router.push({ path: "/", replace: true });
    };

    return {
      formState,
      formRef,
      visible,
      onOk,
      orderData,
      countryOptions,
      provinceAndCityOptions,
      paymentTypeOptions,
      filterOption,
      orderColumns,
      checkNumericInput,
      logout,
      confirmLoading,
    };
  },
});
</script>
<style>
.collection-create-form_last-form-item {
  margin-bottom: 0;
}
</style>
