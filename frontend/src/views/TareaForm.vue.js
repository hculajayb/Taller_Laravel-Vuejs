import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
import { addTarea } from '@/services/tareas';
const router = useRouter();
const valid = ref(false);
const loading = ref(false);
const estados = ['pendiente', 'en_progreso', 'completada'];
const usuarios = ref([]);
const form = ref({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    fecha_vencimiento: '',
    usuario_id: null,
});
const snackbar = ref({ show: false, text: '' });
const goBack = () => router.back();
const fetchUsuarios = async () => {
    const { data } = await api.get('/usuarios/listUsers');
    usuarios.value = data;
};
const onSubmit = async () => {
    if (!valid.value)
        return;
    loading.value = true;
    try {
        await addTarea(form.value);
        snackbar.value = { show: true, text: 'Tarea creada correctamente' };
        setTimeout(() => router.push('/tareas'), 800);
    }
    catch (e) {
        snackbar.value = { show: true, text: 'Error al crear tarea' };
    }
    finally {
        loading.value = false;
    }
};
onMounted(fetchUsuarios);
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
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "py-8" },
    ...{ style: {} },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "py-8" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.VCardTitle;
/** @type {[typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, typeof __VLS_components.VCardTitle, typeof __VLS_components.vCardTitle, ]} */ ;
// @ts-ignore
VCardTitle;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ class: "text-h6" },
}));
const __VLS_13 = __VLS_12({
    ...{ class: "text-h6" },
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
var __VLS_14;
const __VLS_16 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
VDivider;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_21 = {}.VCardText;
/** @type {[typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, typeof __VLS_components.VCardText, typeof __VLS_components.vCardText, ]} */ ;
// @ts-ignore
VCardText;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({}));
const __VLS_23 = __VLS_22({}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_25 } = __VLS_24.slots;
const __VLS_26 = {}.VForm;
/** @type {[typeof __VLS_components.VForm, typeof __VLS_components.vForm, typeof __VLS_components.VForm, typeof __VLS_components.vForm, ]} */ ;
// @ts-ignore
VForm;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.valid),
}));
const __VLS_28 = __VLS_27({
    ...{ 'onSubmit': {} },
    modelValue: (__VLS_ctx.valid),
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_30;
let __VLS_31;
const __VLS_32 = ({ submit: {} },
    { onSubmit: (__VLS_ctx.onSubmit) });
const { default: __VLS_33 } = __VLS_29.slots;
// @ts-ignore
[valid, onSubmit,];
const __VLS_34 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    modelValue: (__VLS_ctx.form.titulo),
    label: "Título",
    rules: ([v => !!v || 'El título es requerido']),
    prependInnerIcon: "mdi-format-title",
    required: true,
}));
const __VLS_36 = __VLS_35({
    modelValue: (__VLS_ctx.form.titulo),
    label: "Título",
    rules: ([v => !!v || 'El título es requerido']),
    prependInnerIcon: "mdi-format-title",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
// @ts-ignore
[form,];
const __VLS_39 = {}.VTextarea;
/** @type {[typeof __VLS_components.VTextarea, typeof __VLS_components.vTextarea, ]} */ ;
// @ts-ignore
VTextarea;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.form.descripcion),
    label: "Descripción",
    prependInnerIcon: "mdi-text",
}));
const __VLS_41 = __VLS_40({
    modelValue: (__VLS_ctx.form.descripcion),
    label: "Descripción",
    prependInnerIcon: "mdi-text",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
// @ts-ignore
[form,];
const __VLS_44 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.form.estado),
    label: "Estado",
    items: (__VLS_ctx.estados),
    prependInnerIcon: "mdi-progress-check",
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.form.estado),
    label: "Estado",
    items: (__VLS_ctx.estados),
    prependInnerIcon: "mdi-progress-check",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
// @ts-ignore
[form, estados,];
const __VLS_49 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.form.fecha_vencimiento),
    label: "Fecha vencimiento",
    type: "date",
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.form.fecha_vencimiento),
    label: "Fecha vencimiento",
    type: "date",
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
// @ts-ignore
[form,];
const __VLS_54 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    modelValue: (__VLS_ctx.form.usuario_id),
    label: "Asignar a usuario",
    items: (__VLS_ctx.usuarios),
    itemTitle: "nombre",
    itemValue: "id",
    prependInnerIcon: "mdi-account",
    rules: ([v => !!v || 'Seleccione un usuario']),
}));
const __VLS_56 = __VLS_55({
    modelValue: (__VLS_ctx.form.usuario_id),
    label: "Asignar a usuario",
    items: (__VLS_ctx.usuarios),
    itemTitle: "nombre",
    itemValue: "id",
    prependInnerIcon: "mdi-account",
    rules: ([v => !!v || 'Seleccione un usuario']),
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
// @ts-ignore
[form, usuarios,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex ga-2 mt-4" },
});
const __VLS_59 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_61 = __VLS_60({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
const { default: __VLS_63 } = __VLS_62.slots;
// @ts-ignore
[loading,];
var __VLS_62;
const __VLS_64 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    ...{ 'onClick': {} },
    variant: "tonal",
}));
const __VLS_66 = __VLS_65({
    ...{ 'onClick': {} },
    variant: "tonal",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
let __VLS_68;
let __VLS_69;
const __VLS_70 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_71 } = __VLS_67.slots;
// @ts-ignore
[goBack,];
var __VLS_67;
var __VLS_29;
var __VLS_24;
var __VLS_9;
const __VLS_72 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    modelValue: (__VLS_ctx.snackbar.show),
    timeout: (2500),
}));
const __VLS_74 = __VLS_73({
    modelValue: (__VLS_ctx.snackbar.show),
    timeout: (2500),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
const { default: __VLS_76 } = __VLS_75.slots;
// @ts-ignore
[snackbar,];
(__VLS_ctx.snackbar.text);
// @ts-ignore
[snackbar,];
var __VLS_75;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['ga-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        valid: valid,
        loading: loading,
        estados: estados,
        usuarios: usuarios,
        form: form,
        snackbar: snackbar,
        goBack: goBack,
        onSubmit: onSubmit,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
