import { ref, Ref } from 'vue';
import { usePreset } from '@primeuix/themes';
import { Preset } from '@primeuix/themes/types';
import { useStorage } from '@vueuse/core';
import bootstrap from '@/theme/bootstrap-preset';
import breeze from '@/theme/breeze-preset';
import enterprise from '@/theme/enterprise-preset';
import noir from '@/theme/noir-preset';
import warm from '@/theme/warm-preset';

interface ThemePreset {
    label: string,
    value: string,
    preset: Preset,
}

const presets = ref<ThemePreset[]>([
    { label: 'Bootstrap', value: 'bootstrap', preset: bootstrap },
    { label: 'Breeze', value: 'breeze', preset: breeze },
    { label: 'Enterprise', value: 'enterprise', preset: enterprise },
    { label: 'Noir', value: 'noir', preset: noir },
    { label: 'Warm', value: 'warm', preset: warm },
]);

const selectedPreset: Ref<string> = useStorage('theme-preset', 'noir');

function getCurrentPreset(): Preset {
    return (
        presets.value.find((p) => p.value === selectedPreset.value)?.preset ||
        presets.value[3].preset
    );
}

function setPreset(presetValue: string): void {
    const themePreset = presets.value.find((p) => p.value === presetValue);
    if (themePreset) {
        usePreset(themePreset.preset);
    }
}

setPreset(selectedPreset.value);

export function useThemePreset() {
    return {
        presets,
        selectedPreset,
        getCurrentPreset,
        setPreset,
    };
}