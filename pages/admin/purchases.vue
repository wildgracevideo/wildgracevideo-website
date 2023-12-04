<template>
  <p class="text-2xl mt-8 ml-8 mb-4">Purchases</p>
  <Spinner v-if="loading" :additional-classes="['relative', 'z-20', 'top-60', 'left-1/2']" height-class="h-16" width-class="w-16" />
  <div 
      v-if="paginationResponse?.results" 
      class="grid grid-cols-5 rounded-xl mx-8 text-center border-2 border-gray-400 h-"
      :class="{ 'opacity-30': loading, '-mt-16': loading }"
  >
    <p class="border-b-2 border-gray-800 font-bold">Email</p>
    <p class="border-b-2 border-gray-800 font-bold">Name</p>
    <p class="border-b-2 border-gray-800 font-bold">Product</p>
    <p class="border-b-2 border-gray-800 font-bold">Message Status</p>
    <p class="border-b-2 border-gray-800 font-bold">Purchased At</p>
    <template v-for="[index, purchase] in paginationResponse?.results?.entries()">
        <p class="border-gray-400 px-2 break-words" :class="{ 'border-b-2': index !== paginationResponse!.results.length - 1 }">{{ purchase.email }}</p>
        <p class="border-gray-400 px-2 break-words" :class="{ 'border-b-2': index !== paginationResponse!.results.length - 1 }">{{ purchase.firstName }} {{ purchase.lastName }} </p>
        <p class="border-gray-400 px-2 break-words" :class="{ 'border-b-2': index !== paginationResponse!.results.length - 1 }">{{ purchase.product }}</p>
        <p class="border-gray-400 px-2 break-words" :class="{ 'border-b-2': index !== paginationResponse!.results.length - 1 }">{{ purchase.sendGridMessageStatus }}</p>
        <p class="border-gray-400 px-2 break-words" :class="{ 'border-b-2': index !== paginationResponse!.results.length - 1 }">{{ formatDate(purchase.createdAt) }}</p>
    </template>
  </div>
  <AdminPaginatedTableFooter :result="paginationResponse!" :page-select-handler="pageSelectHandler" />
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "admin" });
useHead({
  title: "WGV Admin | Purchases",
});

const limit = 10;

const { data: paginationResponse } = await useFetch(`/api/admin/purchases?offset=0&limit=${limit}`);

const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat(undefined, {
      timeStyle: "short",
      dateStyle: "medium",
    }).format(Date.parse(dateStr));
};

const loading = ref(false);

const pageSelectHandler = async (pageIndex: number) => {
    loading.value = true;
    const { data: paginationUpdateResponse } = await useFetch(`/api/admin/purchases?offset=${pageIndex * limit}&limit=${limit}`);
    loading.value = false;
    paginationResponse.value = paginationUpdateResponse.value;
};
</script>
