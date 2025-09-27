import { ref, onMounted, computed } from 'vue';
import api from '@/services/api';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
const props = defineProps();
const items = ref([]);
const loading = ref(false);
const headers = [
    { title: 'Nombre', value: 'nombre' },
    { title: 'Email', value: 'email' },
    { title: 'Rol', value: 'rol' },
    { title: 'Fecha creación', value: 'created_at' },
];
// carga desde la API
const fetchUsers = async () => {
    loading.value = true;
    try {
        const { data } = await api.get('/usuarios/listUsers');
        items.value = data;
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchUsers);
const filtered = computed(() => {
    const q = (props.searchTerm || '').toLowerCase().trim();
    if (!q)
        return items.value;
    return items.value.filter(u => u.nombre.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.rol.toLowerCase().includes(q));
});
// 📅 Aplicamos formato a la fecha con hora incluida
const formattedUsers = computed(() => filtered.value.map(u => ({
    ...u,
    created_at: u.created_at
        ? format(new Date(u.created_at), 'dd/MM/yyyy HH:mm', { locale: es })
        : ''
})));
// recargar si quieres al cambiar término (opcional)
/* watch(() => props.searchTerm, () => { ... }) */
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VDataTable;
/** @type {[typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, ]} */ ;
// @ts-ignore
VDataTable;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    items: (__VLS_ctx.formattedUsers),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}));
const __VLS_2 = __VLS_1({
    items: (__VLS_ctx.formattedUsers),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[formattedUsers, headers, loading,];
{
    const { 'no-data': __VLS_6 } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pa-6 text-center" },
    });
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        loading: loading,
        headers: headers,
        formattedUsers: formattedUsers,
    }),
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
