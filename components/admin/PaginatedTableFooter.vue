<template>
    <div class="mx-8 flex items-center justify-between px-6 py-3">
        <div class="flex flex-1 items-center justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    {{ ' ' }}
                    <span class="font-medium">{{ result.offset + 1 }}</span>
                    {{ ' ' }}
                    to
                    {{ ' ' }}
                    <span class="font-medium"
                        >{{
                            Math.min(
                                result.totalResults,
                                (result.page + 1) * result.limit
                            )
                        }}
                    </span>
                    {{ ' ' }}
                    of
                    {{ ' ' }}
                    <span class="font-medium">{{ result.totalResults }} </span>
                    {{ ' ' }}
                    results
                </p>
            </div>
            <div>
                <nav
                    class="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        href="#"
                        class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{
                            'text-gray-400': result.page === 0,
                            'text-gray-800': result.page !== 0,
                            'pointer-events-none': result.page === 0,
                        }"
                        @click="pageSelectHandler(result.page - 1)"
                        >Previous
                    </a>
                    <a
                        href="#"
                        class="relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        :class="{
                            'text-gray-400':
                                result.page + 1 === result.totalPages,
                            'text-gray-800':
                                result.page + 1 !== result.totalPages,
                            'pointer-events-none':
                                result.page + 1 === result.totalPages,
                        }"
                        @click="pageSelectHandler(result.page + 1)"
                        >Next
                    </a>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type PaginationResult } from '~/types/pagination';
    import { type SerializeObject } from '~/types/nitro';
    import type { JSONObject } from '~/types/main';

    defineProps<{
        result: PaginationResult<SerializeObject<JSONObject>>;
        pageSelectHandler: (pageIndex: number) => Promise<void>;
    }>();
</script>
