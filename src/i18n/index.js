import { createI18n } from 'vue-i18n';

import en from './en';
import ru from './ru';
import fr from './fr';

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, ru, fr }
});

export default i18n;
