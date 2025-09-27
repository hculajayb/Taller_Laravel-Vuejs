import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';
const router = useRouter();
const valid = ref(false);
const loading = ref(false);
const roles = ['admin', 'usuario'];
const form = ref({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
});
const snackbar = ref({ show: false, text: '' });
const goBack = () => router.back();
const onSubmit = async () => {
    if (!valid.value)
        return;
    loading.value = true;
    try {
        // POST al endpoint que nos diste
        await api.post('/usuarios/addUser', {
            nombre: form.value.nombre,
            email: form.value.email,
            password: form.value.password,
            rol: form.value.rol,
        });
        snackbar.value = { show: true, text: 'Usuario creado correctamente' };
        // Redirige al listado
        setTimeout(() => router.push('/usuarios'), 800);
    }
    catch (e) {
        const msg = e?.response?.data?.message || 'Error al crear usuario';
        snackbar.value = { show: true, text: msg };
    }
    finally {
        loading.value = false;
    }
};
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
    modelValue: (__VLS_ctx.form.nombre),
    label: "Nombre",
    rules: ([v => !!v || 'El nombre es requerido']),
    prependInnerIcon: "mdi-account",
    required: true,
}));
const __VLS_36 = __VLS_35({
    modelValue: (__VLS_ctx.form.nombre),
    label: "Nombre",
    rules: ([v => !!v || 'El nombre es requerido']),
    prependInnerIcon: "mdi-account",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
// @ts-ignore
[form,];
const __VLS_39 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    modelValue: (__VLS_ctx.form.email),
    label: "Email",
    type: "email",
    rules: ([v => !!v || 'El email es requerido']),
    prependInnerIcon: "mdi-email",
    required: true,
}));
const __VLS_41 = __VLS_40({
    modelValue: (__VLS_ctx.form.email),
    label: "Email",
    type: "email",
    rules: ([v => !!v || 'El email es requerido']),
    prependInnerIcon: "mdi-email",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
// @ts-ignore
[form,];
const __VLS_44 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.form.password),
    label: "Password",
    type: "password",
    rules: ([v => !!v || 'El password es requerido', v => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres']),
    prependInnerIcon: "mdi-lock",
    required: true,
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.form.password),
    label: "Password",
    type: "password",
    rules: ([v => !!v || 'El password es requerido', v => (v?.length ?? 0) >= 6 || 'Mínimo 6 caracteres']),
    prependInnerIcon: "mdi-lock",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
// @ts-ignore
[form,];
const __VLS_49 = {}.VSelect;
/** @type {[typeof __VLS_components.VSelect, typeof __VLS_components.vSelect, ]} */ ;
// @ts-ignore
VSelect;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
    modelValue: (__VLS_ctx.form.rol),
    label: "Rol",
    items: (__VLS_ctx.roles),
    rules: ([v => !!v || 'El rol es requerido']),
    prependInnerIcon: "mdi-shield-account",
    required: true,
}));
const __VLS_51 = __VLS_50({
    modelValue: (__VLS_ctx.form.rol),
    label: "Rol",
    items: (__VLS_ctx.roles),
    rules: ([v => !!v || 'El rol es requerido']),
    prependInnerIcon: "mdi-shield-account",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_50));
// @ts-ignore
[form, roles,];
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "d-flex ga-2 mt-4" },
});
const __VLS_54 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_56 = __VLS_55({
    type: "submit",
    color: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_55));
const { default: __VLS_58 } = __VLS_57.slots;
// @ts-ignore
[loading,];
var __VLS_57;
const __VLS_59 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    ...{ 'onClick': {} },
    variant: "tonal",
}));
const __VLS_61 = __VLS_60({
    ...{ 'onClick': {} },
    variant: "tonal",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
let __VLS_63;
let __VLS_64;
const __VLS_65 = ({ click: {} },
    { onClick: (__VLS_ctx.goBack) });
const { default: __VLS_66 } = __VLS_62.slots;
// @ts-ignore
[goBack,];
var __VLS_62;
var __VLS_29;
var __VLS_24;
var __VLS_9;
const __VLS_67 = {}.VSnackbar;
/** @type {[typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, typeof __VLS_components.VSnackbar, typeof __VLS_components.vSnackbar, ]} */ ;
// @ts-ignore
VSnackbar;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    modelValue: (__VLS_ctx.snackbar.show),
    timeout: (2500),
}));
const __VLS_69 = __VLS_68({
    modelValue: (__VLS_ctx.snackbar.show),
    timeout: (2500),
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
const { default: __VLS_71 } = __VLS_70.slots;
// @ts-ignore
[snackbar,];
(__VLS_ctx.snackbar.text);
// @ts-ignore
[snackbar,];
var __VLS_70;
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
        roles: roles,
        form: form,
        snackbar: snackbar,
        goBack: goBack,
        onSubmit: onSubmit,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
