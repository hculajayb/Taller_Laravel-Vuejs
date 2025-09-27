import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getTareas } from '@/services/tareas';
import api from '@/services/api';
const tareas = ref([]);
const loading = ref(false);
const router = useRouter();
const headers = [
    { title: 'Título', value: 'titulo' },
    { title: 'Descripción', value: 'descripcion' },
    { title: 'Estado', value: 'estado' },
    { title: 'Fecha vencimiento', value: 'fecha_vencimiento' },
    { title: 'Usuario asignado', value: 'usuario' },
    { title: 'Creación', value: 'created_at' },
];
const fetchTareas = async () => {
    loading.value = true;
    try {
        const { data } = await getTareas();
        tareas.value = data;
    }
    finally {
        loading.value = false;
    }
};
const goAddTarea = () => router.push('/tareas/nueva');
const downloadExcel = async () => {
    try {
        const response = await api.get('/tareas/exportPendientes', {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'tareas_pendientes.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    catch (error) {
        console.error('Error descargando Excel', error);
    }
};
const goToUsuarios = () => {
    router.push({ name: 'usuarios' });
};
onMounted(fetchTareas);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VContainer;
/** @type {[typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, typeof __VLS_components.VContainer, typeof __VLS_components.vContainer, ]} */ ;
// @ts-ignore
VContainer;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ class: "pa-4" },
}));
const __VLS_8 = __VLS_7({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex justify-space-between align-center mb-4" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-h6" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({});
const __VLS_11 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onClick': {} },
    color: "primary",
}));
const __VLS_13 = __VLS_12({
    ...{ 'onClick': {} },
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
const __VLS_17 = ({ click: {} },
    { onClick: (__VLS_ctx.goToUsuarios) });
const { default: __VLS_18 } = __VLS_14.slots;
// @ts-ignore
[goToUsuarios,];
var __VLS_14;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex ga-2" },
});
const __VLS_19 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    ...{ 'onClick': {} },
    color: "success",
}));
const __VLS_21 = __VLS_20({
    ...{ 'onClick': {} },
    color: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_23;
let __VLS_24;
const __VLS_25 = ({ click: {} },
    { onClick: (__VLS_ctx.downloadExcel) });
const { default: __VLS_26 } = __VLS_22.slots;
// @ts-ignore
[downloadExcel,];
var __VLS_22;
const __VLS_27 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    ...{ 'onClick': {} },
    color: "primary",
}));
const __VLS_29 = __VLS_28({
    ...{ 'onClick': {} },
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
const __VLS_33 = ({ click: {} },
    { onClick: (__VLS_ctx.goAddTarea) });
const { default: __VLS_34 } = __VLS_30.slots;
// @ts-ignore
[goAddTarea,];
var __VLS_30;
const __VLS_35 = {}.VDataTable;
/** @type {[typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, typeof __VLS_components.VDataTable, typeof __VLS_components.vDataTable, ]} */ ;
// @ts-ignore
VDataTable;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    items: (__VLS_ctx.tareas),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}));
const __VLS_37 = __VLS_36({
    items: (__VLS_ctx.tareas),
    headers: (__VLS_ctx.headers),
    loading: (__VLS_ctx.loading),
    ...{ class: "elevation-1" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_39 } = __VLS_38.slots;
// @ts-ignore
[tareas, headers, loading,];
{
    const { 'item.usuario': __VLS_40 } = __VLS_38.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_40);
    (item.usuario?.nombre);
    (item.usuario?.rol);
}
{
    const { 'item.created_at': __VLS_41 } = __VLS_38.slots;
    const [{ item }] = __VLS_getSlotParameters(__VLS_41);
    (new Date(item.created_at).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    }));
}
{
    const { 'no-data': __VLS_42 } = __VLS_38.slots;
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "pa-6 text-center" },
    });
}
var __VLS_38;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-space-between']} */ ;
/** @type {__VLS_StyleScopedClasses['align-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['elevation-1']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        tareas: tareas,
        loading: loading,
        headers: headers,
        goAddTarea: goAddTarea,
        downloadExcel: downloadExcel,
        goToUsuarios: goToUsuarios,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
