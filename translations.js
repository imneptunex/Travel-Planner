// This file holds all the translation data and the logic to apply it.

const translations = {
    "en": {
        // --- index.html keys ---
        "step1_title": "Let's build your perfect trip.",
        "step1_subheading": "To start, tell us the core details of your trip.",
        "label_destination": "Where are you heading?",
        "placeholder_destination": "e.g., Istanbul, Turkey",
        "label_start_date": "Start Date",
        "label_end_date": "End Date",
        "label_accommodation": "Where are you staying?",
        "placeholder_accommodation": "Hotel name or neighborhood (e.g., 'Karaköy')",
        "label_arrival": "Arrival Time (Optional)",
        "label_departure": "Departure Time (Optional)",
        "option_not_sure": "I'm not sure",
        "option_morning_arrival": "Morning (8AM - 12PM)",
        "option_afternoon_arrival": "Afternoon (12PM - 5PM)",
        "option_evening_arrival": "Evening (5PM - 9PM)",
        "option_late_arrival": "Late Night (After 9PM)",
        "option_morning_departure": "Morning (8AM - 12PM)",
        "option_afternoon_departure": "Afternoon (12PM - 5PM)",
        "option_evening_departure": "Evening (5PM - 9PM)",
        "option_late_departure": "Late Night (After 9PM)",
        "step2_title": "Your travel style.",
        "step2_subheading": "This helps us tailor the vibe and budget of your plan.",
        "label_who": "Who are you traveling with?",
        "who_solo": "Solo",
        "who_partner": "Partner",
        "who_friends": "Friends",
        "who_family": "Family (with kids)",
        "child_activities": "Prioritize child-friendly activities?",
        "child_special_requests": "Any special requests?",
        "placeholder_child_requests": "e.g., 'Stroller-friendly routes', 'Need a 2 PM nap break'",
        "special_occasion": "🎉 This is for a special occasion (Birthday, Anniversary, etc.)",
        "label_budget": "Daily Budget (Per Person, Excl. Hotel)",
        "budget_low": "Backpacker",
        "budget_medium": "Standard",
        "budget_high": "Premium",
        "budget_custom": "Custom",
        "budget_custom_span": "(Enter amount)",
        "label_custom_budget": "Approx. budget per day (USD)",
        "placeholder_custom_budget": "e.g., 150",
        "label_mobility": "Mobility Style",
        "mobility_low": "Accessible",
        "mobility_low_span": "(Taxis / low walking)",
        "mobility_medium": "Moderate Pace",
        "mobility_medium_span": "(10k steps)",
        "mobility_high": "Walk All Day",
        "mobility_high_span": "(15k+ steps)",
        "step3_title": "Your daily rhythm.",
        "step3_subheading": "Are you an early bird? Do you like a tight schedule?",
        "label_start_time": "I'm an...",
        "start_early": "Early Bird",
        "start_early_span": "(Start at 8 AM)",
        "start_normal": "Avg. Riser",
        "start_normal_span": "(Start 9-10 AM)",
        "start_late": "Sleeper",
        "start_late_span": "(Start 11 AM+)",
        "label_end_time": "I'm a...",
        "end_early": "Early Night",
        "end_early_span": "(End by 9 PM)",
        "end_normal": "Night Owl",
        "end_normal_span": "(End by 11 PM)",
        "end_late": "All-Nighter",
        "end_late_span": "(End after 1 AM)",
        "label_structure": "How structured do you want your plan?",
        "structure_full": "Full Schedule",
        "structure_full_span": "(Plan 9 AM - 9 PM)",
        "structure_flexible": "Flexible Plan",
        "structure_flexible_span": "(Key activities + free time)",
        "structure_suggestions": "Just Suggestions",
        "structure_suggestions_span": "(A list of 'pins' I can choose from)",
        "step4_title": "The fun stuff.",
        "step4_subheading": "Almost done! What are you most excited about?",
        "label_interests": "Interests",
        "interest_foodie": "🍽️ Foodie",
        "sublabel_foodie": "What kind of \"Foodie\"? (Check all that apply)",
        "interest_foodie_1": "Street Food & Local Joints",
        "interest_foodie_2": "Fine Dining & \"Must-Try\" Restaurants",
        "interest_foodie_3": "Cooking Classes & Food Markets",
        "interest_foodie_4": "Cozy Cafes & Breweries",
        "interest_culture": "🏛️ Culture Vulture",
        "sublabel_culture": "What kind of \"Culture\"? (Check all that apply)",
        "interest_culture_1": "History & Ancient Sites",
        "interest_culture_2": "Art & Design Museums",
        "interest_culture_3": "Local Workshops & Crafts",
        "interest_culture_4": "Music & Theater",
        "interest_hidden": "💎 Hidden Gems",
        "interest_nightlife": "🌙 Nightlife",
        "label_must_do": "One \"Must-Do\" (Optional)",
        "placeholder_must_do": "e.g., 'See the Hagia Sophia'",
        "label_avoid": "Anything to Avoid (Optional)",
        "placeholder_avoid": "e.g., 'Large crowds, museums'",
        "label_diet": "Food & Dietary Needs",
        "diet_vegetarian": "Vegetarian",
        "diet_vegan": "Vegan",
        "diet_halal": "Halal / Muslim",
        "diet_gluten_free": "Gluten-Free",
        "btn_back": "Back",
        "btn_next": "Next",
        "btn_submit": "Generate My Plan",
        "btn_submit_loading": "Generating...",
        
        // --- plan.html keys ---
        "plan_share": "Share Plan",
        "plan_download": "Download PDF",
        "plan_title_mock": "Your Vivid Plan: Istanbul", // Mock data
        "plan_dates_mock": "December 12 - 18, 2024", // Mock data
        "tab_glance": "At-a-Glance",
        "tab_itinerary": "Daily Itinerary",
        "tab_packing": "Smart Packing List",
        "tab_food": "Food & Drink Guide",
        "loading_title": "Generating your plan...",
        "loading_text": "This may take a moment. If this doesn't load, please go back and try again.",
        "error_title": "Error: No Plan Found",
        "error_text": "We couldn't find a plan. Please go back to the homepage and try generating a new one."
    },
    "tr": {
        // --- index.html keys ---
        "step1_title": "Mükemmel seyahatinizi oluşturalım.",
        "step1_subheading": "Başlamak için seyahatinizin ana ayrıntılarını bizimle paylaşın.",
        "label_destination": "Nereye gidiyorsunuz?",
        "placeholder_destination": "Örn: İstanbul, Türkiye",
        "label_start_date": "Başlangıç Tarihi",
        "label_end_date": "Bitiş Tarihi",
        "label_accommodation": "Nerede kalıyorsunuz?",
        "placeholder_accommodation": "Otel adı veya semt (Örn: 'Karaköy')",
        "label_arrival": "Varış Saati (İsteğe bağlı)",
        "label_departure": "Ayrılış Saati (İsteğe bağlı)",
        "option_not_sure": "Emin değilim",
        "option_morning_arrival": "Sabah (08:00 - 12:00)",
        "option_afternoon_arrival": "Öğleden Sonra (12:00 - 17:00)",
        "option_evening_arrival": "Akşam (17:00 - 21:00)",
        "option_late_arrival": "Gece (21:00 sonrası)",
        "option_morning_departure": "Sabah (08:00 - 12:00)",
        "option_afternoon_departure": "Öğleden Sonra (12:00 - 17:00)",
        "option_evening_departure": "Akşam (17:00 - 21:00)",
        "option_late_departure": "Gece (21:00 sonrası)",
        "step2_title": "Seyahat tarzınız.",
        "step2_subheading": "Bu, planınızın atmosferini ve bütçesini uyarlamamıza yardımcı olur.",
        "label_who": "Kiminle seyahat ediyorsunuz?",
        "who_solo": "Yalnız",
        "who_partner": "Partnerimle",
        "who_friends": "Arkadaşlarımla",
        "who_family": "Ailemle (çocuklu)",
        "child_activities": "Çocuk dostu aktivitelere öncelik verilsin mi?",
        "child_special_requests": "Özel istekleriniz var mı?",
        "placeholder_child_requests": "Örn: 'Bebek arabası dostu rotalar', 'Öğleden sonra 2'de uyku molası'",
        "special_occasion": "🎉 Bu özel bir durum için (Doğum günü, Yıldönümü vb.)",
        "label_budget": "Günlük Bütçe (Kişi başı, otel hariç)",
        "budget_low": "Sırt Çantalı",
        "budget_medium": "Standart",
        "budget_high": "Premium",
        "budget_custom": "Özel",
        "budget_custom_span": "(Miktar girin)",
        "label_custom_budget": "Günlük yaklaşık bütçe (USD)",
        "placeholder_custom_budget": "Örn: 150",
        "label_mobility": "Hareket Tarzınız",
        "mobility_low": "Erişilebilir",
        "mobility_low_span": "(Taksi / Az yürüyüş)",
        "mobility_medium": "Orta Hızda",
        "mobility_medium_span": "(10 bin adım)",
        "mobility_high": "Tüm Gün Yürüyüş",
        "mobility_high_span": "(15 bin+ adım)",
        "step3_title": "Günlük ritminiz.",
        "step3_subheading": "Erkenci misiniz? Sıkı bir programı sever misiniz?",
        "label_start_time": "Sabahları...",
        "start_early": "Erkenciyim",
        "start_early_span": "(Sabah 8'de başlarım)",
        "start_normal": "Normalim",
        "start_normal_span": "(9-10 gibi başlarım)",
        "start_late": "Uykucuyum",
        "start_late_span": "(11'den sonra başlarım)",
        "label_end_time": "Akşamları...",
        "end_early": "Erken Yatarım",
        "end_early_span": "(Akşam 9'da biter)",
        "end_normal": "Gece Kuşuyum",
        "end_normal_span": "(Akşam 11'de biter)",
        "end_late": "Sabahlarım",
        "end_late_span": "(Gece 1'den sonra biter)",
        "label_structure": "Ne kadar planlı bir program istersiniz?",
        "structure_full": "Tam Program",
        "structure_full_span": "(Sabah 9 - Akşam 9)",
        "structure_flexible": "Esnek Plan",
        "structure_flexible_span": "(Ana aktiviteler + serbest zaman)",
        "structure_suggestions": "Sadece Öneriler",
        "structure_suggestions_span": "(Seçebileceğim bir 'pin' listesi)",
        "step4_title": "Eğlenceli kısım.",
        "step4_subheading": "Neredeyse bitti! Sizi en çok ne heyecanlandırıyor?",
        "label_interests": "İlgi Alanları",
        "interest_foodie": "🍽️ Gurme",
        "sublabel_foodie": "Ne tür bir \"Gurme\"? (Tümünü seçin)",
        "interest_foodie_1": "Sokak Lezzetleri & Yerel Mekanlar",
        "interest_foodie_2": "Lüks Restoranlar & \"Mutlaka Denenmeli\" Mekanlar",
        "interest_foodie_3": "Aşçılık Dersleri & Yiyecek Pazarları",
        "interest_foodie_4": "Rahat Kafeler & Bira Fabrikaları",
        "interest_culture": "🏛️ Kültür Avcısı",
        "sublabel_culture": "Ne tür bir \"Kültür\"? (Tümünü seçin)",
        "interest_culture_1": "Tarih & Antik Alanlar",
        "interest_culture_2": "Sanat & Tasarım Müzeleri",
        "interest_culture_3": "Yerel Atölyeler & El Sanatları",
        "interest_culture_4": "Müzik & Tiyatro",
        "interest_hidden": "💎 Gizli Kalmış Yerler",
        "interest_nightlife": "🌙 Gece Hayatı",
        "label_must_do": "Mutlaka Yapılmalı (İsteğe bağlı)",
        "placeholder_must_do": "Örn: 'Ayasofya'yı görmek'",
        "label_avoid": "Kaçınılması Gerekenler (İsteğe bağlı)",
        "placeholder_avoid": "Örn: 'Kalabalık yerler, müzeler'",
        "label_diet": "Yemek & Diyet İhtiyaçları",
        "diet_vegetarian": "Vejetaryen",
        "diet_vegan": "Vegan",
        "diet_halal": "Helal / Müslüman",
        "diet_gluten_free": "Glutensiz",
        "btn_back": "Geri",
        "btn_next": "İleri",
        "btn_submit": "Planımı Oluştur",
        "btn_submit_loading": "Oluşturuluyor...",

        // --- plan.html keys ---
        "plan_share": "Planı Paylaş",
        "plan_download": "PDF İndir",
        "tab_glance": "Genel Bakış",
        "tab_itinerary": "Günlük Program",
        "tab_packing": "Akıllı Bavul Listesi",
        "tab_food": "Yeme & İçme Rehberi",
        "loading_title": "Planınız oluşturuluyor...",
        "loading_text": "Bu biraz zaman alabilir. Eğer yüklenmezse, lütfen geri dönüp tekrar deneyin.",
        "error_title": "Hata: Plan Bulunamadı",
        "error_text": "Bir plan bulamadık. Lütfen ana sayfaya dönüp tekrar deneyin."
    }
};

/**
 * Applies translations to the page based on the selected language.
 * @param {string} lang - The language code (e.g., "en" or "tr").
 */
function applyTranslations(lang) {
    // Default to 'en' if the lang or translations[lang] doesn't exist
    const dict = translations[lang] || translations['en'];
    
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.dataset.translateKey;
        if (dict[key]) {
            el.innerText = dict[key];
        }
    });

    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.dataset.translatePlaceholder;
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });
    
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = lang;
}

/**
 * Gets the saved language from localStorage or URL param, defaulting to 'en'.
 * @returns {string} The language code.
 */
function getSavedLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && translations[urlLang]) {
        localStorage.setItem('vividLanguage', urlLang);
        return urlLang;
    }
    return localStorage.getItem('vividLanguage') || 'en';
}

