import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import UsersList from '@/views/UsersList.vue';
const router = useRouter();
const search = ref('');
const user = ref(null);
onMounted(() => {
    const raw = localStorage.getItem('user');
    user.value = raw ? JSON.parse(raw) : null;
});
const isAdmin = computed(() => user.value?.rol === 'admin');
const goAddUser = () => router.push('/usuarios/nuevo');
const goToTareas = () => router.push('/tareas');
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
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
    fluid: true,
}));
const __VLS_2 = __VLS_1({
    fluid: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
const { default: __VLS_5 } = __VLS_3.slots;
const __VLS_6 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
const { default: __VLS_10 } = __VLS_9.slots;
const __VLS_11 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    cols: "12",
    md: "3",
}));
const __VLS_13 = __VLS_12({
    cols: "12",
    md: "3",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_15 } = __VLS_14.slots;
const __VLS_16 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ class: "pa-4" },
}));
const __VLS_18 = __VLS_17({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const { default: __VLS_20 } = __VLS_19.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-subtitle-1 mb-2" },
});
const __VLS_21 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onClick': {} },
    block: true,
    color: "primary",
    ...{ class: "mb-3" },
    disabled: (!__VLS_ctx.isAdmin),
}));
const __VLS_23 = __VLS_22({
    ...{ 'onClick': {} },
    block: true,
    color: "primary",
    ...{ class: "mb-3" },
    disabled: (!__VLS_ctx.isAdmin),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
const __VLS_27 = ({ click: {} },
    { onClick: (__VLS_ctx.goAddUser) });
const { default: __VLS_28 } = __VLS_24.slots;
// @ts-ignore
[isAdmin, goAddUser,];
var __VLS_24;
const __VLS_29 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
    modelValue: (__VLS_ctx.search),
    label: "Buscar usuarios",
    prependInnerIcon: "mdi-magnify",
    density: "comfortable",
    clearable: true,
    ...{ class: "mb-4" },
}));
const __VLS_31 = __VLS_30({
    modelValue: (__VLS_ctx.search),
    label: "Buscar usuarios",
    prependInnerIcon: "mdi-magnify",
    density: "comfortable",
    clearable: true,
    ...{ class: "mb-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
// @ts-ignore
[search,];
const __VLS_34 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    ...{ 'onClick': {} },
    block: true,
    color: "primary",
    ...{ class: "mb-3" },
}));
const __VLS_36 = __VLS_35({
    ...{ 'onClick': {} },
    block: true,
    color: "primary",
    ...{ class: "mb-3" },
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
const __VLS_40 = ({ click: {} },
    { onClick: (__VLS_ctx.goToTareas) });
const { default: __VLS_41 } = __VLS_37.slots;
// @ts-ignore
[goToTareas,];
var __VLS_37;
const __VLS_42 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    block: true,
    color: "error",
    variant: "tonal",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    block: true,
    color: "error",
    variant: "tonal",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_46;
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (__VLS_ctx.logout) });
const { default: __VLS_49 } = __VLS_45.slots;
// @ts-ignore
[logout,];
var __VLS_45;
const __VLS_50 = {}.VDivider;
/** @type {[typeof __VLS_components.VDivider, typeof __VLS_components.vDivider, ]} */ ;
// @ts-ignore
VDivider;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
    ...{ class: "my-4" },
}));
const __VLS_52 = __VLS_51({
    ...{ class: "my-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-caption" },
});
__VLS_asFunctionalElement(__VLS_elements.strong, __VLS_elements.strong)({});
(__VLS_ctx.user?.nombre);
// @ts-ignore
[user,];
(__VLS_ctx.user?.rol);
// @ts-ignore
[user,];
var __VLS_19;
var __VLS_14;
const __VLS_55 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    cols: "12",
    md: "9",
}));
const __VLS_57 = __VLS_56({
    cols: "12",
    md: "9",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_59 } = __VLS_58.slots;
const __VLS_60 = {}.VCard;
/** @type {[typeof __VLS_components.VCard, typeof __VLS_components.vCard, typeof __VLS_components.VCard, typeof __VLS_components.vCard, ]} */ ;
// @ts-ignore
VCard;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    ...{ class: "pa-4" },
}));
const __VLS_62 = __VLS_61({
    ...{ class: "pa-4" },
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const { default: __VLS_64 } = __VLS_63.slots;
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "text-h6 mb-4" },
});
/** @type {[typeof UsersList, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(UsersList, new UsersList({
    searchTerm: (__VLS_ctx.search),
}));
const __VLS_66 = __VLS_65({
    searchTerm: (__VLS_ctx.search),
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
// @ts-ignore
[search,];
var __VLS_63;
var __VLS_58;
var __VLS_9;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-subtitle-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['my-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup: () => ({
        UsersList: UsersList,
        search: search,
        user: user,
        isAdmin: isAdmin,
        goAddUser: goAddUser,
        goToTareas: goToTareas,
        logout: logout,
    }),
});
export default (await import('vue')).defineComponent({});
; /* PartiallyEnd: #4569/main.vue */
