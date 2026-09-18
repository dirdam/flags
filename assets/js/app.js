        document.getElementById('footerYear').textContent = new Date().getFullYear();

        // --- i18n: per-app copy of the shared convention (see the dirdam.squadro.app
        // landing page and sibling apps) — deliberately duplicated rather than loaded
        // from a shared file, so this app never depends on another app's deploy/cache
        // state. This app supports a third language (Japanese) that the others don't.
        const I18N_STORAGE_KEY = 'dirdam-lang';
        const SUPPORTED_LANGS = ['en', 'es', 'ja'];
        const LANG_LABELS = { en: 'EN', es: 'ES', ja: '日本語' };

        const STRINGS = {
            en: {
                browserTabTitle: 'Flags',
                pageTitle: 'Flags',
                subtitle: 'A touch of color',
                introHtml: 'Visualize countries that use the <strong>same flag colors</strong>.<br>Colors are <strong>simplified</strong>; using exact real colors would make almost no flags match.<br><strong>Click a color</strong> to filter countries by it.<br><strong>Click a country</strong> to see its matches.',
                introHtmlBlend: 'Every country is filled with the <strong>blended color</strong> of its real flag — all its points mixed together like paint.<br><strong>Hover or click a country</strong> to see the <strong>blend rgb values</strong>.',
                modeSameColor: 'Same color flags',
                modeBlend: 'Flag blender',
                detailPlaceholder: 'Hover a country on the map to see its flag and the other countries sharing its colors. Click it to keep this panel pinned while you explore.',
                blendDetailPlaceholder: 'Hover a country on the map to see its real flag. Click it to keep this panel pinned while you explore.',
                detailSimilarLabelOne: '{n} country with the same colors:',
                detailSimilarLabelOther: '{n} countries with the same colors:',
                detailColorFilterLabelOne: '{n} country matching the selected colors:',
                detailColorFilterLabelOther: '{n} countries matching the selected colors:',
                clearColors: 'Clear color selection',
                detailNoSimilar: 'No other country shares this exact combination of colors.',
                detailNoColorMatch: 'No country has this exact combination of colors.',
                zoomIn: 'Zoom in',
                zoomOut: 'Zoom out',
                seeMoreTools: 'See more tools',
                viewSource: 'View source',
            },
            es: {
                browserTabTitle: 'Banderas',
                pageTitle: 'Banderas',
                subtitle: 'Un toque de color',
                introHtml: 'Visualiza los países que usan los <strong>mismos colores de bandera</strong>.<br>Los colores están <strong>simplificados</strong>; usar los colores reales exactos haría que casi ninguna bandera coincidiera.<br><strong>Haz clic en un color</strong> para filtrar países por él.<br><strong>Haz clic en un país</strong> para ver sus coincidencias.',
                introHtmlBlend: 'Cada país se rellena con el <strong>color mezclado</strong> de su bandera real: todos sus píxeles combinados como si fueran pintura, no promediados digitalmente.<br><strong>Pasa el cursor o haz clic en un país</strong> para ver su bandera real.',
                modeSameColor: 'Banderas del mismo color',
                modeBlend: 'Mezclador de banderas',
                detailPlaceholder: 'Selecciona un país en el mapa para ver su bandera y los demás países que comparten sus colores. Haz click para fijar este panel mientras explora.',
                blendDetailPlaceholder: 'Selecciona un país en el mapa para ver su bandera real. Haz clic para fijar este panel mientras explora.',
                detailSimilarLabelOne: '{n} país con los mismos colores:',
                detailSimilarLabelOther: '{n} países con los mismos colores:',
                detailColorFilterLabelOne: '{n} país que coincide con los colores seleccionados:',
                detailColorFilterLabelOther: '{n} países que coinciden con los colores seleccionados:',
                clearColors: 'Borrar selección de colores',
                detailNoSimilar: 'Ningún otro país comparte exactamente esta combinación de colores.',
                detailNoColorMatch: 'Ningún país tiene exactamente esta combinación de colores.',
                zoomIn: 'Acercar',
                zoomOut: 'Alejar',
                seeMoreTools: 'Ver más herramientas',
                viewSource: 'Ver código fuente',
            },
            ja: {
                browserTabTitle: '国旗',
                pageTitle: '国旗',
                subtitle: '国の彩り',
                introHtml: '<strong>同じ国旗の色</strong>を使う国を可視化します。<br>色は<strong>単純化</strong>しています。実際の正確な色を使うと、ほとんどの国旗が一致しないためです。<br><strong>色をクリック</strong>すると、その色で国を絞り込めます。<br><strong>国をクリック</strong>すると一致する国を表示します。',
                introHtmlBlend: '各国は実際の国旗の<strong>混色</strong>で塗られています。すべてのピクセルを絵の具のように混ぜ合わせたもので、デジタル平均ではありません。<br><strong>国にカーソルを合わせるかクリック</strong>すると、実際の国旗が表示されます。',
                modeSameColor: '同じ色の国旗',
                modeBlend: '国旗ブレンダー',
                detailPlaceholder: '地図上の国を選択すると、その国旗と同じ色を使う他の国々が表示されます。クリックするとこのパネルを固定できます。',
                blendDetailPlaceholder: '地図上の国を選択すると、実際の国旗が表示されます。クリックするとこのパネルを固定できます。',
                detailSimilarLabelOne: '同じ色を使う国が{n}ヶ国：',
                detailSimilarLabelOther: '同じ色を使う国が{n}ヶ国：',
                detailColorFilterLabelOne: '選択した色に一致する国が{n}ヶ国：',
                detailColorFilterLabelOther: '選択した色に一致する国が{n}ヶ国：',
                clearColors: '色の選択をクリア',
                detailNoSimilar: 'この色の組み合わせと完全に一致する国はありません。',
                detailNoColorMatch: 'この色の組み合わせを持つ国はありません。',
                zoomIn: '拡大',
                zoomOut: '縮小',
                seeMoreTools: '他のツールを見る',
                viewSource: 'ソースを見る',
            },
        };

        function detectInitialLang() {
            const urlLang = new URLSearchParams(location.search).get('lang');
            if (SUPPORTED_LANGS.includes(urlLang)) return urlLang;
            const stored = localStorage.getItem(I18N_STORAGE_KEY);
            if (SUPPORTED_LANGS.includes(stored)) return stored;
            const browserLang = (navigator.language || 'en').slice(0, 2);
            return SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
        }

        let currentLang = detectInitialLang();
        const langChangeListeners = [];

        function getLang() { return currentLang; }

        function setLang(lang) {
            if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
            currentLang = lang;
            localStorage.setItem(I18N_STORAGE_KEY, lang);
            document.documentElement.lang = lang;
            applyStaticDict();
            langChangeListeners.forEach((fn) => fn(lang));
        }

        function onLangChange(fn) { langChangeListeners.push(fn); }

        function t(dict, key) {
            return dict[currentLang]?.[key] ?? dict.en?.[key] ?? key;
        }

        function applyStaticDict() {
            document.querySelectorAll('[data-i18n-html]').forEach((el) => {
                el.innerHTML = t(STRINGS, el.getAttribute('data-i18n-html'));
            });
            document.querySelectorAll('[data-i18n]').forEach((el) => {
                const val = t(STRINGS, el.getAttribute('data-i18n'));
                const attr = el.getAttribute('data-i18n-attr');
                attr ? el.setAttribute(attr, val) : (el.textContent = val);
            });
        }

        const toggleContainer = document.getElementById('langToggle');
        function renderToggle() {
            toggleContainer.innerHTML = '';
            SUPPORTED_LANGS.forEach((lang) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = LANG_LABELS[lang] || lang.toUpperCase();
                btn.setAttribute('aria-label', `Switch language to ${lang}`);
                btn.setAttribute('aria-pressed', String(lang === getLang()));
                btn.addEventListener('click', () => setLang(lang));
                toggleContainer.appendChild(btn);
            });
        }
        onLangChange(renderToggle);

        document.documentElement.lang = currentLang;
        applyStaticDict();
        renderToggle();

        // --- Flags map interaction (unchanged from the original dirdam.github.io/flags.html) ---

				// Code -> localized display name, extracted from the map's own <title> tags (en) plus manual es/ja translations.
				const COUNTRY_NAMES = {
				    en: {"hn":"Honduras","fm":"Micronesia","aq":"Antarctica","so":"Somalia","dm":"Dominica","fr":"France","gb":"United Kingdom","ru":"Russia","kp":"North Korea","lr":"Liberia","nz":"New Zealand","au":"Australia","ck":"Cook Islands","tw":"Taiwan","us":"United States","no":"Norway","cl":"Chile","cz":"Czech Republic","la":"Laos","np":"Nepal","ws":"Samoa","th":"Thailand","cr":"Costa Rica","pa":"Panama","kh":"Cambodia","sk":"Slovakia","is":"Iceland","pr":"Puerto Rico","si":"Slovenia","cu":"Cuba","dz":"Algeria","bg":"Bulgaria","ga":"Gabon","al":"Albania","ph":"Philippines","rs":"Serbia","cv":"Cape Verde","my":"Malaysia","nu":"Niue","ve":"Venezuela","ki":"Kiribati","ss":"South Sudan","rw":"Rwanda","sd":"Sudan","eh":"Western Sahara","xs":"Somaliland","ly":"Libya","jp":"Japan","sg":"Singapore","dk":"Denmark","hk":"Hong Kong","pl":"Poland","ge":"Georgia","at":"Austria","ch":"Switzerland","mc":"Monaco","id":"Indonesia","bh":"Bahrain","tr":"Turkey","ca":"Canada","to":"Tonga","tn":"Tunisia","pe":"Peru","se":"Sweden","sr":"Suriname","lc":"Saint Lucia","gw":"Guinea-Bissau","st":"Sao Tome and Principe","vu":"Vanuatu","pk":"Pakistan","sa":"Saudi Arabia","gf":"French Guiana","bo":"Bolivia","lt":"Lithuania","bj":"Benin","bf":"Burkina Faso","cg":"Congo","ml":"Mali","gn":"Guinea","do":"Dominican Republic","gt":"Guatemala","kw":"Kuwait","jo":"Jordan","sy":"Syria","ps":"Palestine","kg":"Kyrgyzstan","vn":"Vietnam","cn":"China","mk":"North Macedonia","il":"Israel","gr":"Greece","fi":"Finland","ng":"Nigeria","sb":"Solomon Islands","py":"Paraguay","sc":"Seychelles","cf":"Central African Republic","km":"Comoros","dj":"Djibouti","uz":"Uzbekistan","az":"Azerbaijan","gq":"Equatorial Guinea","kr":"South Korea","ke":"Kenya","iq":"Iraq","gd":"Grenada","co":"Colombia","li":"Liechtenstein","ro":"Romania","sv":"El Salvador","br":"Brazil","tj":"Tajikistan","mm":"Myanmar","pt":"Portugal","in":"India","mv":"Maldives","mg":"Madagascar","bi":"Burundi","lb":"Lebanon","om":"Oman","it":"Italy","ir":"Iran","hu":"Hungary","ma":"Morocco","bd":"Bangladesh","bn":"Brunei","ug":"Uganda","tl":"Timor-Leste","by":"Belarus","tt":"Trinidad and Tobago","ye":"Yemen","ls":"Lesotho","mw":"Malawi","nl":"Netherlands","mu":"Mauritius","et":"Ethiopia","ci":"Ivory Coast","ne":"Niger","ie":"Ireland","bz":"Belize","ht":"Haiti","tv":"Tuvalu","aw":"Aruba","mt":"Malta","ad":"Andorra","md":"Moldova","ua":"Ukraine","pw":"Palau","kz":"Kazakhstan","lu":"Luxembourg","td":"Chad","ar":"Argentina","uy":"Uruguay","cm":"Cameroon","sn":"Senegal","ae":"United Arab Emirates","ag":"Antigua and Barbuda","sz":"Eswatini","zm":"Zambia","tg":"Togo","cy":"Cyprus","af":"Afghanistan","gh":"Ghana","lv":"Latvia","mr":"Mauritania","ni":"Nicaragua","me":"Montenegro","mh":"Marshall Islands","za":"South Africa","zw":"Zimbabwe","gy":"Guyana","kn":"Saint Kitts and Nevis","vc":"Saint Vincent and the Grenadines","nr":"Nauru","cw":"Curaçao","xk":"Kosovo","ba":"Bosnia and Herzegovina","bs":"Bahamas","va":"Vatican City","be":"Belgium","ao":"Angola","de":"Germany","mn":"Mongolia","am":"Armenia","tm":"Turkmenistan","tz":"Tanzania","bw":"Botswana","cd":"DR Congo","lk":"Sri Lanka","mo":"Macau","mx":"Mexico","nc":"New Caledonia","na":"Namibia","mz":"Mozambique","bb":"Barbados","bt":"Bhutan","sm":"San Marino","hr":"Croatia","fj":"Fiji","sl":"Sierra Leone","ec":"Ecuador","jm":"Jamaica","pg":"Papua New Guinea","eg":"Egypt","ee":"Estonia","er":"Eritrea","gm":"Gambia","qa":"Qatar","es":"Spain"},
				    es: {"hn":"Honduras","fm":"Micronesia","aq":"Antártida","so":"Somalia","dm":"Dominica","fr":"Francia","gb":"Reino Unido","ru":"Rusia","kp":"Corea del Norte","lr":"Liberia","nz":"Nueva Zelanda","au":"Australia","ck":"Islas Cook","tw":"Taiwán","us":"Estados Unidos","no":"Noruega","cl":"Chile","cz":"República Checa","la":"Laos","np":"Nepal","ws":"Samoa","th":"Tailandia","cr":"Costa Rica","pa":"Panamá","kh":"Camboya","sk":"Eslovaquia","is":"Islandia","pr":"Puerto Rico","si":"Eslovenia","cu":"Cuba","dz":"Argelia","bg":"Bulgaria","ga":"Gabón","al":"Albania","ph":"Filipinas","rs":"Serbia","cv":"Cabo Verde","my":"Malasia","nu":"Niue","ve":"Venezuela","ki":"Kiribati","ss":"Sudán del Sur","rw":"Ruanda","sd":"Sudán","eh":"Sáhara Occidental","xs":"Somalilandia","ly":"Libia","jp":"Japón","sg":"Singapur","dk":"Dinamarca","hk":"Hong Kong","pl":"Polonia","ge":"Georgia","at":"Austria","ch":"Suiza","mc":"Mónaco","id":"Indonesia","bh":"Baréin","tr":"Turquía","ca":"Canadá","to":"Tonga","tn":"Túnez","pe":"Perú","se":"Suecia","sr":"Surinam","lc":"Santa Lucía","gw":"Guinea-Bisáu","st":"Santo Tomé y Príncipe","vu":"Vanuatu","pk":"Pakistán","sa":"Arabia Saudita","gf":"Guayana Francesa","bo":"Bolivia","lt":"Lituania","bj":"Benín","bf":"Burkina Faso","cg":"Congo","ml":"Malí","gn":"Guinea","do":"República Dominicana","gt":"Guatemala","kw":"Kuwait","jo":"Jordania","sy":"Siria","ps":"Palestina","kg":"Kirguistán","vn":"Vietnam","cn":"China","mk":"Macedonia del Norte","il":"Israel","gr":"Grecia","fi":"Finlandia","ng":"Nigeria","sb":"Islas Salomón","py":"Paraguay","sc":"Seychelles","cf":"República Centroafricana","km":"Comoras","dj":"Yibuti","uz":"Uzbekistán","az":"Azerbaiyán","gq":"Guinea Ecuatorial","kr":"Corea del Sur","ke":"Kenia","iq":"Irak","gd":"Granada","co":"Colombia","li":"Liechtenstein","ro":"Rumanía","sv":"El Salvador","br":"Brasil","tj":"Tayikistán","mm":"Myanmar","pt":"Portugal","in":"India","mv":"Maldivas","mg":"Madagascar","bi":"Burundi","lb":"Líbano","om":"Omán","it":"Italia","ir":"Irán","hu":"Hungría","ma":"Marruecos","bd":"Bangladés","bn":"Brunéi","ug":"Uganda","tl":"Timor Oriental","by":"Bielorrusia","tt":"Trinidad y Tobago","ye":"Yemen","ls":"Lesoto","mw":"Malaui","nl":"Países Bajos","mu":"Mauricio","et":"Etiopía","ci":"Costa de Marfil","ne":"Níger","ie":"Irlanda","bz":"Belice","ht":"Haití","tv":"Tuvalu","aw":"Aruba","mt":"Malta","ad":"Andorra","md":"Moldavia","ua":"Ucrania","pw":"Palaos","kz":"Kazajistán","lu":"Luxemburgo","td":"Chad","ar":"Argentina","uy":"Uruguay","cm":"Camerún","sn":"Senegal","ae":"Emiratos Árabes Unidos","ag":"Antigua y Barbuda","sz":"Suazilandia","zm":"Zambia","tg":"Togo","cy":"Chipre","af":"Afganistán","gh":"Ghana","lv":"Letonia","mr":"Mauritania","ni":"Nicaragua","me":"Montenegro","mh":"Islas Marshall","za":"Sudáfrica","zw":"Zimbabue","gy":"Guyana","kn":"San Cristóbal y Nieves","vc":"San Vicente y las Granadinas","nr":"Nauru","cw":"Curazao","xk":"Kosovo","ba":"Bosnia y Herzegovina","bs":"Bahamas","va":"Ciudad del Vaticano","be":"Bélgica","ao":"Angola","de":"Alemania","mn":"Mongolia","am":"Armenia","tm":"Turkmenistán","tz":"Tanzania","bw":"Botsuana","cd":"República Democrática del Congo","lk":"Sri Lanka","mo":"Macao","mx":"México","nc":"Nueva Caledonia","na":"Namibia","mz":"Mozambique","bb":"Barbados","bt":"Bután","sm":"San Marino","hr":"Croacia","fj":"Fiyi","sl":"Sierra Leona","ec":"Ecuador","jm":"Jamaica","pg":"Papúa Nueva Guinea","eg":"Egipto","ee":"Estonia","er":"Eritrea","gm":"Gambia","qa":"Catar","es":"España"},
				    ja: {"hn":"ホンジュラス","fm":"ミクロネシア連邦","aq":"南極","so":"ソマリア","dm":"ドミニカ国","fr":"フランス","gb":"イギリス","ru":"ロシア","kp":"北朝鮮","lr":"リベリア","nz":"ニュージーランド","au":"オーストラリア","ck":"クック諸島","tw":"台湾","us":"アメリカ合衆国","no":"ノルウェー","cl":"チリ","cz":"チェコ","la":"ラオス","np":"ネパール","ws":"サモア","th":"タイ","cr":"コスタリカ","pa":"パナマ","kh":"カンボジア","sk":"スロバキア","is":"アイスランド","pr":"プエルトリコ","si":"スロベニア","cu":"キューバ","dz":"アルジェリア","bg":"ブルガリア","ga":"ガボン","al":"アルバニア","ph":"フィリピン","rs":"セルビア","cv":"カーボベルデ","my":"マレーシア","nu":"ニウエ","ve":"ベネズエラ","ki":"キリバス","ss":"南スーダン","rw":"ルワンダ","sd":"スーダン","eh":"西サハラ","xs":"ソマリランド","ly":"リビア","jp":"日本","sg":"シンガポール","dk":"デンマーク","hk":"香港","pl":"ポーランド","ge":"ジョージア","at":"オーストリア","ch":"スイス","mc":"モナコ","id":"インドネシア","bh":"バーレーン","tr":"トルコ","ca":"カナダ","to":"トンガ","tn":"チュニジア","pe":"ペルー","se":"スウェーデン","sr":"スリナム","lc":"セントルシア","gw":"ギニアビサウ","st":"サントメ・プリンシペ","vu":"バヌアツ","pk":"パキスタン","sa":"サウジアラビア","gf":"フランス領ギアナ","bo":"ボリビア","lt":"リトアニア","bj":"ベナン","bf":"ブルキナファソ","cg":"コンゴ共和国","ml":"マリ","gn":"ギニア","do":"ドミニカ共和国","gt":"グアテマラ","kw":"クウェート","jo":"ヨルダン","sy":"シリア","ps":"パレスチナ","kg":"キルギス","vn":"ベトナム","cn":"中国","mk":"北マケドニア","il":"イスラエル","gr":"ギリシャ","fi":"フィンランド","ng":"ナイジェリア","sb":"ソロモン諸島","py":"パラグアイ","sc":"セーシェル","cf":"中央アフリカ共和国","km":"コモロ","dj":"ジブチ","uz":"ウズベキスタン","az":"アゼルバイジャン","gq":"赤道ギニア","kr":"韓国","ke":"ケニア","iq":"イラク","gd":"グレナダ","co":"コロンビア","li":"リヒテンシュタイン","ro":"ルーマニア","sv":"エルサルバドル","br":"ブラジル","tj":"タジキスタン","mm":"ミャンマー","pt":"ポルトガル","in":"インド","mv":"モルディブ","mg":"マダガスカル","bi":"ブルンジ","lb":"レバノン","om":"オマーン","it":"イタリア","ir":"イラン","hu":"ハンガリー","ma":"モロッコ","bd":"バングラデシュ","bn":"ブルネイ","ug":"ウガンダ","tl":"東ティモール","by":"ベラルーシ","tt":"トリニダード・トバゴ","ye":"イエメン","ls":"レソト","mw":"マラウイ","nl":"オランダ","mu":"モーリシャス","et":"エチオピア","ci":"コートジボワール","ne":"ニジェール","ie":"アイルランド","bz":"ベリーズ","ht":"ハイチ","tv":"ツバル","aw":"アルバ","mt":"マルタ","ad":"アンドラ","md":"モルドバ","ua":"ウクライナ","pw":"パラオ","kz":"カザフスタン","lu":"ルクセンブルク","td":"チャド","ar":"アルゼンチン","uy":"ウルグアイ","cm":"カメルーン","sn":"セネガル","ae":"アラブ首長国連邦","ag":"アンティグア・バーブーダ","sz":"エスワティニ","zm":"ザンビア","tg":"トーゴ","cy":"キプロス","af":"アフガニスタン","gh":"ガーナ","lv":"ラトビア","mr":"モーリタニア","ni":"ニカラグア","me":"モンテネグロ","mh":"マーシャル諸島","za":"南アフリカ","zw":"ジンバブエ","gy":"ガイアナ","kn":"セントクリストファー・ネイビス","vc":"セントビンセント・グレナディーン","nr":"ナウル","cw":"キュラソー","xk":"コソボ","ba":"ボスニア・ヘルツェゴビナ","bs":"バハマ","va":"バチカン","be":"ベルギー","ao":"アンゴラ","de":"ドイツ","mn":"モンゴル","am":"アルメニア","tm":"トルクメニスタン","tz":"タンザニア","bw":"ボツワナ","cd":"コンゴ民主共和国","lk":"スリランカ","mo":"マカオ","mx":"メキシコ","nc":"ニューカレドニア","na":"ナミビア","mz":"モザンビーク","bb":"バルバドス","bt":"ブータン","sm":"サンマリノ","hr":"クロアチア","fj":"フィジー","sl":"シエラレオネ","ec":"エクアドル","jm":"ジャマイカ","pg":"パプアニューギニア","eg":"エジプト","ee":"エストニア","er":"エリトリア","gm":"ガンビア","qa":"カタール","es":"スペイン"}
				};

				// Code -> one blended hex color per country, precomputed offline from
				// assets/real_flags/<code>.svg by tools/blend_colors.py: every pixel of
				// the real flag mixed together with pigment-style (Kubelka-Munk) mixing
				// rather than a plain digital RGB average — see that script for details.
				// FLAG_ASPECT (width/height of that same SVG) lets the Blend panel size
				// the real flag and its solid-color counterpart to the real flag's shape
				// instead of forcing every country into the same box.
				const BLEND_COLORS = {"ad":"#814e42","ae":"#815356","af":"#54442b","ag":"#8d2436","al":"#d70500","am":"#77442c","ao":"#6e0c0f","aq":"#1966b1","ar":"#9cc3df","at":"#f95d7b","au":"#15339a","aw":"#549eab","az":"#737a59","ba":"#1a615e","bb":"#145f5b","bd":"#32584f","be":"#9e4f30","bf":"#7e5c39","bg":"#a07a78","bh":"#e9447a","bi":"#b77f6f","bj":"#886b3a","bn":"#c1b238","bo":"#9b6e35","br":"#169c38","bs":"#207051","bt":"#fc9735","bw":"#6891ae","by":"#a74338","bz":"#472585","ca":"#ed6072","cd":"#4d6295","cf":"#898c4e","cg":"#a27b40","ch":"#e6474f","ci":"#99bd53","ck":"#1736a0","cl":"#c05b79","cm":"#906338","cn":"#ee1f24","co":"#906f39","cr":"#8748a0","cu":"#5d48b6","cv":"#2353b2","cw":"#074b71","cy":"#f7edd4","cz":"#b0558a","de":"#94360c","dj":"#7cd28f","dk":"#dd306e","dm":"#3a7645","do":"#833e8c","dz":"#8ab58b","ec":"#9d7f30","ee":"#49769a","eg":"#a23e5c","eh":"#6a564f","er":"#a44a44","es":"#ef4020","et":"#7e6631","fi":"#6ab0f2","fj":"#8284bd","fm":"#77b2dd","fr":"#865387","ga":"#4aaf53","gb":"#944195","gd":"#9f5635","ge":"#ff8c9b","gf":"#865387","gh":"#915b30","gm":"#7b484a","gn":"#966739","gq":"#a9804a","gr":"#54a4e9","gt":"#77b3dd","gw":"#976a34","gy":"#6a7d43","hk":"#f02b3b","hn":"#2e7ce6","hr":"#873a99","ht":"#5d126e","hu":"#bb6c7d","id":"#ff687c","ie":"#a2bf49","il":"#81b5f9","in":"#abc244","iq":"#9e3c5b","ir":"#c1786d","is":"#3836a8","it":"#ab7473","jm":"#427032","jo":"#734b4a","jp":"#f8b4d3","ke":"#62301e","kg":"#f22e30","kh":"#5e1975","ki":"#af4460","km":"#a69257","kn":"#614329","kp":"#91395a","kr":"#cdc2d4","kw":"#8c5558","kz":"#12b4ad","la":"#671c64","lb":"#ed6f80","lc":"#70ced3","li":"#551857","lk":"#ab662f","lr":"#ca4e93","ls":"#49a3a6","lt":"#887133","lu":"#a67da3","lv":"#ba3365","ly":"#46251b","ma":"#af312c","mc":"#f36599","md":"#764b3a","me":"#d1191b","mg":"#b19065","mh":"#1a5e95","mk":"#f04b38","ml":"#a97030","mm":"#cd8633","mn":"#8d3547","mo":"#0f896b","mr":"#6b5d3f","mt":"#ef629a","mu":"#626c3b","mv":"#a02d32","mw":"#6e301e","mx":"#a15e70","my":"#9f477c","mz":"#696632","na":"#53525e","nc":"#865387","ne":"#aaa23f","ng":"#4ec18c","ni":"#3698eb","nl":"#994f96","no":"#9a2168","np":"#d069a7","nr":"#063f7a","nu":"#d1bc20","nz":"#122e95","om":"#c45a4a","pa":"#9467b0","pe":"#e84268","pg":"#6d1412","ph":"#7f3281","pk":"#429570","pl":"#f86b9f","pr":"#bb4c77","ps":"#6b5a52","pt":"#a53409","pw":"#23bdae","py":"#8c5a92","qa":"#bd3e82","ro":"#754f3d","rs":"#a24999","ru":"#8d5a93","rw":"#36ae57","sa":"#0f7d3d","sb":"#257356","sc":"#976d64","sd":"#89434e","se":"#249256","sg":"#fd819b","si":"#a45a8d","sk":"#ad5d87","sl":"#55c7a0","sm":"#a2cbd1","sn":"#a1753f","so":"#468ddf","sr":"#9d5f4f","ss":"#46463f","st":"#6c9523","sv":"#2b84e4","sy":"#58785c","sz":"#894550","td":"#6c4c31","tg":"#6e7337","th":"#9b4982","tj":"#ba7464","tl":"#be2c1b","tm":"#247e3e","tn":"#ea122e","to":"#d51c3e","tr":"#e51328","tt":"#ae1a34","tv":"#2f83bb","tw":"#ae131d","tz":"#228041","ua":"#3fa13d","ug":"#9b4515","us":"#c05d91","uy":"#7bb1e2","uz":"#63c695","va":"#f9e74c","vc":"#379a3d","ve":"#785134","vn":"#de2d1e","vu":"#613f25","ws":"#8a173b","xk":"#32599c","xs":"#ba6b60","ye":"#a43e60","za":"#4c625a","zm":"#3c7203","zw":"#956a21"};
				const FLAG_ASPECT = {"ad":1.429,"ae":2.0,"af":1.5,"ag":1.5,"al":1.395,"am":2.0,"ao":1.5,"aq":1.5,"ar":1.6,"at":1.5,"au":2.0,"aw":1.5,"az":2.0,"ba":2.0,"bb":1.5,"bd":1.667,"be":1.154,"bf":1.5,"bg":1.667,"bh":1.667,"bi":1.667,"bj":1.5,"bn":2.0,"bo":1.463,"br":1.429,"bs":2.0,"bt":1.5,"bw":1.5,"by":2.0,"bz":1.667,"ca":2.0,"cd":1.333,"cf":1.5,"cg":1.5,"ch":1.0,"ci":1.5,"ck":2.0,"cl":1.5,"cm":1.5,"cn":1.5,"co":1.5,"cr":1.667,"cu":2.0,"cv":1.69,"cw":1.5,"cy":1.5,"cz":1.5,"de":1.667,"dj":1.5,"dk":1.319,"dm":2.0,"do":1.5,"dz":1.5,"ec":1.5,"ee":1.579,"eg":1.5,"eh":2.0,"er":2.0,"es":1.5,"et":2.0,"fi":1.644,"fj":2.0,"fm":1.905,"fr":1.5,"ga":1.333,"gb":2.0,"gd":1.667,"ge":1.5,"gf":1.5,"gh":1.5,"gm":1.5,"gn":1.5,"gq":1.5,"gr":1.5,"gt":1.6,"gw":2.0,"gy":1.667,"hk":1.5,"hn":2.0,"hr":2.0,"ht":1.667,"hu":2.0,"id":1.5,"ie":2.0,"il":1.379,"in":1.5,"iq":1.5,"ir":1.739,"is":1.395,"it":1.5,"jm":2.0,"jo":2.0,"jp":1.5,"ke":1.5,"kg":1.667,"kh":1.558,"ki":2.0,"km":1.667,"kn":1.5,"kp":2.0,"kr":1.5,"kw":2.0,"kz":2.0,"la":1.5,"lb":1.5,"lc":2.0,"li":1.667,"lk":2.0,"lr":1.905,"ls":1.5,"lt":1.667,"lu":1.667,"lv":2.0,"ly":2.0,"ma":1.5,"mc":1.25,"md":2.0,"me":2.0,"mg":1.5,"mh":1.905,"mk":2.0,"ml":1.5,"mm":1.5,"mn":2.0,"mo":1.5,"mr":1.5,"mt":1.5,"mu":1.5,"mv":1.5,"mw":1.5,"mx":1.739,"my":2.0,"mz":1.5,"na":1.5,"nc":1.5,"ne":1.165,"ng":2.0,"ni":1.667,"nl":1.5,"no":1.379,"np":0.822,"nr":2.0,"nu":2.0,"nz":2.0,"om":2.0,"pa":1.5,"pe":1.5,"pg":1.333,"ph":2.0,"pk":1.5,"pl":1.6,"pr":1.5,"ps":2.0,"pt":1.5,"pw":1.6,"py":1.818,"qa":2.553,"ro":1.5,"rs":1.5,"ru":1.5,"rw":1.5,"sa":1.5,"sb":2.0,"sc":2.0,"sd":2.0,"se":1.6,"sg":1.5,"si":2.0,"sk":1.5,"sl":1.5,"sm":1.333,"sn":1.5,"so":1.5,"sr":1.5,"ss":2.0,"st":2.0,"sv":1.765,"sy":1.5,"sz":1.5,"td":1.5,"tg":1.622,"th":1.5,"tj":2.0,"tl":2.0,"tm":1.5,"tn":1.5,"to":2.0,"tr":1.5,"tt":1.667,"tv":2.0,"tw":1.5,"tz":1.5,"ua":1.5,"ug":1.5,"us":1.905,"uy":1.5,"uz":2.0,"va":1.0,"vc":1.5,"ve":1.5,"vn":1.5,"vu":1.667,"ws":2.0,"xk":1.395,"xs":1.5,"ye":1.5,"za":1.5,"zm":1.5,"zw":2.0};

				var colors_clicked = []; // Array of colors clicked

				const countries_by_color = {"light_blue": ["hn","fm","aq","so","rw","lc","gt","dj","uz","az","tv","aw","ua","pw","kz","lu","ar","uy","ni","vc","bs","tz","bw","cd","mx","sm","hr","fj","sl","ec","er","es"],
				"white": ["hn","fm","aq","so","dm","fr","gb","ru","kp","lr","nz","au","ck","tw","us","no","cl","cz","la","np","ws","th","cr","pa","kh","sk","is","pr","si","cu","dz","bg","ph","rs","cv","my","nu","ve","ki","ss","sd","eh","xs","ly","jp","sg","dk","hk","pl","ge","at","ch","mc","id","bh","tr","ca","to","tn","pe","sr","lc","pk","sa","do","gt","kw","jo","sy","ps","il","gr","fi","ng","sb","py","sc","cf","km","dj","uz","az","gq","kr","ke","iq","sv","br","tj","mm","pt","in","mv","mg","bi","lb","om","it","ir","hu","bn","ug","tl","by","tt","ye","ls","nl","ci","ne","ie","bz","ht","tv","aw","mt","lu","ar","uy","ae","ag","sz","tg","cy","lv","ni","mh","za","zw","gy","kn","nr","cw","xk","ba","va","tm","bw","mo","mx","na","mz","bt","sm","hr","fj","sl","pg","eg","ee","gm","qa","es"],
				"black": ["dm","al","ss","sd","eh","xs","ly","lc","gw","st","vu","kw","jo","sy","ps","kr","ke","iq","bn","ug","tl","tt","ye","ls","mw","ae","ag","sz","zm","af","gh","za","zw","gy","kn","bs","be","ao","de","tz","bw","nc","mz","bb","ec","jm","pg","eg","ee"],
				"dark_green": ["dm","dz","bg","ss","rw","sd","eh","xs","ly","pk","sa","do","sb","ke","iq","gd","ma","bd","mw","cm","sn","zm","tg","af","gh","mr","tm","mo","mx","nc","na","mz","gm"],
				"red": ["dm","fr","gb","ru","kp","lr","nz","au","ck","tw","us","no","cl","cz","la","np","ws","th","cr","pa","kh","sk","is","pr","si","cu","dz","bg","al","ph","rs","cv","my","nu","ve","ki","sd","eh","xs","ly","jp","sg","dk","hk","pl","ge","at","ch","mc","id","bh","tr","ca","to","tn","pe","gw","st","vu","gf","bo","lt","bj","bf","cg","ml","gn","do","kw","jo","sy","ps","kg","vn","cn","mk","py","sc","cf","km","dj","uz","az","gq","kr","co","li","ro","tj","mm","pt","mv","mg","bi","lb","om","it","ir","hu","ma","bd","bn","ug","tl","tt","ye","mw","mu","et","tv","aw","mt","ad","md","lu","td","cm","sn","zm","tg","af","gh","za","zw","gy","kn","be","ao","de","am","tm","cd","mx","nc","hr","fj","ec","eg","er","es"],
				"yellow": ["dm","ga","ph","rs","cv","my","nu","ve","ki","ss","rw","se","sr","lc","gw","st","vu","gf","bo","lt","bj","bf","cg","ml","gn","kg","vn","cn","mk","sb","py","sc","cf","km","gd","co","li","ro","sv","br","tj","mm","pt","bn","ug","tl","mu","et","bz","ht","tv","aw","ad","md","ua","pw","kz","td","ar","uy","cm","sn","ag","sz","tg","cy","af","gh","mr","ni","me","za","zw","gy","kn","vc","nr","cw","xk","ba","bs","va","be","ao","de","mn","tz","cd","lk","mo","mx","nc","na","mz","bb","bt","sm","ec","jm","pg","er","es"],
				"blue": ["fr","gb","ru","kp","lr","nz","au","ck","tw","us","no","cl","cz","la","np","ws","th","cr","pa","kh","sk","is","pr","si","cu","ga","ph","rs","cv","my","nu","ve","ki","ss","se","do","il","gr","fi","sb","py","sc","cf","km","gq","kr","co","li","ro","sv","br","in","ls","nl","mu","et","bz","ht","tv","ad","md","ag","sz","ni","me","mh","za","nr","cw","xk","ba","mn","am","nc","na","bb","hr","fj","ec","ee","gm"],
				"green": ["ga","sr","gw","st","vu","gf","bo","lt","bj","bf","cg","ml","gn","gt","kw","jo","sy","ps","ng","py","sc","cf","km","dj","uz","az","gq","sv","br","tj","mm","pt","in","mv","mg","bi","lb","om","it","ir","hu","by","ls","mu","et","ci","ne","ie","bz","ht","ae","cy","ni","me","za","zw","gy","kn","vc","tz","lk","mx","sm","sl","jm","er"],
				"dark_red": ["ss","sr","ke","iq","gd","by","nl","bz","ht","ae","ag","sz","lv","me","mn","lk","na","mz","pg","gm"],
				"gray": ["gt","mt","va"],
				"orange": ["gq","in","ci","ne","ie","ad","md","zm","mh","am","tm","lk","mx","bt","eg","es"],
				"dark_blue": ["td"],
				"dark_pink": ["mx","qa"]};

				const countries_colors = {"hn": ["light_blue", "white"],
				"fm": ["light_blue", "white"],
				"aq": ["light_blue", "white"],
				"so": ["light_blue", "white"],
				"dm": ["black", "dark_green", "red", "white", "yellow"],
				"fr": ["blue", "red", "white"],
				"gb": ["blue", "red", "white"],
				"ru": ["blue", "red", "white"],
				"kp": ["blue", "red", "white"],
				"lr": ["blue", "red", "white"],
				"nz": ["blue", "red", "white"],
				"au": ["blue", "red", "white"],
				"ck": ["blue", "red", "white"],
				"tw": ["blue", "red", "white"],
				"us": ["blue", "red", "white"],
				"no": ["blue", "red", "white"],
				"cl": ["blue", "red", "white"],
				"cz": ["blue", "red", "white"],
				"la": ["blue", "red", "white"],
				"np": ["blue", "red", "white"],
				"ws": ["blue", "red", "white"],
				"th": ["blue", "red", "white"],
				"cr": ["blue", "red", "white"],
				"pa": ["blue", "red", "white"],
				"kh": ["blue", "red", "white"],
				"sk": ["blue", "red", "white"],
				"is": ["blue", "red", "white"],
				"pr": ["blue", "red", "white"],
				"si": ["blue", "red", "white"],
				"cu": ["blue", "red", "white"],
				"dz": ["dark_green", "red", "white"],
				"bg": ["dark_green", "red", "white"],
				"ga": ["blue", "green", "yellow"],
				"al": ["black", "red"],
				"ph": ["blue", "red", "white", "yellow"],
				"rs": ["blue", "red", "white", "yellow"],
				"cv": ["blue", "red", "white", "yellow"],
				"my": ["blue", "red", "white", "yellow"],
				"nu": ["blue", "red", "white", "yellow"],
				"ve": ["blue", "red", "white", "yellow"],
				"ki": ["blue", "red", "white", "yellow"],
				"ss": ["blue", "black", "dark_green", "dark_red", "white", "yellow"],
				"rw": ["light_blue", "dark_green", "yellow"],
				"sd": ["black", "dark_green", "red", "white"],
				"eh": ["black", "dark_green", "red", "white"],
				"xs": ["black", "dark_green", "red", "white"],
				"ly": ["black", "dark_green", "red", "white"],
				"jp": ["red", "white"],
				"sg": ["red", "white"],
				"dk": ["red", "white"],
				"hk": ["red", "white"],
				"pl": ["red", "white"],
				"ge": ["red", "white"],
				"at": ["red", "white"],
				"ch": ["red", "white"],
				"mc": ["red", "white"],
				"id": ["red", "white"],
				"bh": ["red", "white"],
				"tr": ["red", "white"],
				"ca": ["red", "white"],
				"to": ["red", "white"],
				"tn": ["red", "white"],
				"pe": ["red", "white"],
				"se": ["blue", "yellow"],
				"sr": ["green", "dark_red", "white", "yellow"],
				"lc": ["black", "light_blue", "white", "yellow"],
				"gw": ["black", "green", "red", "yellow"],
				"st": ["black", "green", "red", "yellow"],
				"vu": ["black", "green", "red", "yellow"],
				"pk": ["dark_green", "white"],
				"sa": ["dark_green", "white"],
				"gf": ["green", "red", "yellow"],
				"bo": ["green", "red", "yellow"],
				"lt": ["green", "red", "yellow"],
				"bj": ["green", "red", "yellow"],
				"bf": ["green", "red", "yellow"],
				"cg": ["green", "red", "yellow"],
				"ml": ["green", "red", "yellow"],
				"gn": ["green", "red", "yellow"],
				"do": ["blue", "dark_green", "red", "white"],
				"gt": ["light_blue", "green", "gray", "white"],
				"kw": ["black", "green", "red", "white"],
				"jo": ["black", "green", "red", "white"],
				"sy": ["black", "green", "red", "white"],
				"ps": ["black", "green", "red", "white"],
				"kg": ["red", "yellow"],
				"vn": ["red", "yellow"],
				"cn": ["red", "yellow"],
				"mk": ["red", "yellow"],
				"il": ["blue", "white"],
				"gr": ["blue", "white"],
				"fi": ["blue", "white"],
				"ng": ["green", "white"],
				"sb": ["blue", "dark_green", "white", "yellow"],
				"py": ["blue", "green", "red", "white", "yellow"],
				"sc": ["blue", "green", "red", "white", "yellow"],
				"cf": ["blue", "green", "red", "white", "yellow"],
				"km": ["blue", "green", "red", "white", "yellow"],
				"dj": ["light_blue", "green", "red", "white"],
				"uz": ["light_blue", "green", "red", "white"],
				"az": ["light_blue", "green", "red", "white"],
				"gq": ["blue", "green", "red", "white", "orange"],
				"kr": ["blue", "black", "red", "white"],
				"ke": ["black", "dark_green", "dark_red", "white"],
				"iq": ["black", "dark_green", "dark_red", "white"],
				"gd": ["dark_green", "dark_red", "yellow"],
				"co": ["blue", "red", "yellow"],
				"li": ["blue", "red", "yellow"],
				"ro": ["blue", "red", "yellow"],
				"sv": ["blue", "green", "white", "yellow"],
				"br": ["blue", "green", "white", "yellow"],
				"tj": ["green", "red", "white", "yellow"],
				"mm": ["green", "red", "white", "yellow"],
				"pt": ["green", "red", "white", "yellow"],
				"in": ["blue", "green", "white", "orange"],
				"mv": ["green", "red", "white"],
				"mg": ["green", "red", "white"],
				"bi": ["green", "red", "white"],
				"lb": ["green", "red", "white"],
				"om": ["green", "red", "white"],
				"it": ["green", "red", "white"],
				"ir": ["green", "red", "white"],
				"hu": ["green", "red", "white"],
				"ma": ["dark_green", "red"],
				"bd": ["dark_green", "red"],
				"bn": ["black", "red", "white", "yellow"],
				"ug": ["black", "red", "white", "yellow"],
				"tl": ["black", "red", "white", "yellow"],
				"by": ["green", "dark_red", "white"],
				"tt": ["black", "red", "white"],
				"ye": ["black", "red", "white"],
				"ls": ["blue", "black", "green", "white"],
				"mw": ["black", "dark_green", "red"],
				"nl": ["blue", "dark_red", "white"],
				"mu": ["blue", "green", "red", "yellow"],
				"et": ["blue", "green", "red", "yellow"],
				"ci": ["green", "white", "orange"],
				"ne": ["green", "white", "orange"],
				"ie": ["green", "white", "orange"],
				"bz": ["blue", "green", "dark_red", "white", "yellow"],
				"ht": ["blue", "green", "dark_red", "white", "yellow"],
				"tv": ["blue", "light_blue", "red", "white", "yellow"],
				"aw": ["light_blue", "red", "white", "yellow"],
				"mt": ["gray", "red", "white"],
				"ad": ["blue", "red", "orange", "yellow"],
				"md": ["blue", "red", "orange", "yellow"],
				"ua": ["light_blue", "yellow"],
				"pw": ["light_blue", "yellow"],
				"kz": ["light_blue", "yellow"],
				"lu": ["light_blue", "red", "white"],
				"td": ["dark_blue", "red", "yellow"],
				"ar": ["light_blue", "white", "yellow"],
				"uy": ["light_blue", "white", "yellow"],
				"cm": ["dark_green", "red", "yellow"],
				"sn": ["dark_green", "red", "yellow"],
				"ae": ["black", "green", "dark_red", "white"],
				"ag": ["blue", "black", "dark_red", "white", "yellow"],
				"sz": ["blue", "black", "dark_red", "white", "yellow"],
				"zm": ["black", "dark_green", "red", "orange"],
				"tg": ["dark_green", "red", "white", "yellow"],
				"cy": ["green", "white", "yellow"],
				"af": ["black", "dark_green", "red", "yellow"],
				"gh": ["black", "dark_green", "red", "yellow"],
				"lv": ["dark_red", "white"],
				"mr": ["dark_green", "yellow"],
				"ni": ["blue", "light_blue", "green", "white", "yellow"],
				"me": ["blue", "green", "dark_red", "yellow"],
				"mh": ["blue", "white", "orange"],
				"za": ["blue", "black", "green", "red", "white", "yellow"],
				"zw": ["black", "green", "red", "white", "yellow"],
				"gy": ["black", "green", "red", "white", "yellow"],
				"kn": ["black", "green", "red", "white", "yellow"],
				"vc": ["light_blue", "green", "yellow"],
				"nr": ["blue", "white", "yellow"],
				"cw": ["blue", "white", "yellow"],
				"xk": ["blue", "white", "yellow"],
				"ba": ["blue", "white", "yellow"],
				"bs": ["black", "light_blue", "yellow"],
				"va": ["gray", "white", "yellow"],
				"be": ["black", "red", "yellow"],
				"ao": ["black", "red", "yellow"],
				"de": ["black", "red", "yellow"],
				"mn": ["blue", "dark_red", "yellow"],
				"am": ["blue", "red", "orange"],
				"tm": ["dark_green", "red", "white", "orange"],
				"tz": ["black", "light_blue", "green", "yellow"],
				"bw": ["black", "light_blue", "white"],
				"cd": ["light_blue", "red", "yellow"],
				"lk": ["green", "dark_red", "orange", "yellow"],
				"mo": ["dark_green", "white", "yellow"],
				"mx": ["light_blue","dark_green","green","dark_pink","red","white","orange","yellow"],
				"nc": ["blue", "black", "dark_green", "red", "yellow"],
				"na": ["blue", "dark_green", "dark_red", "white", "yellow"],
				"mz": ["black", "dark_green", "dark_red", "white", "yellow"],
				"bb": ["blue", "black", "yellow"],
				"bt": ["white", "orange", "yellow"],
				"sm": ["light_blue", "green", "white", "yellow"],
				"hr": ["blue", "light_blue", "red", "white"],
				"fj": ["blue", "light_blue", "red", "white"],
				"sl": ["light_blue", "green", "white"],
				"ec": ["blue", "black", "light_blue", "red", "yellow"],
				"jm": ["black", "green", "yellow"],
				"pg": ["black", "dark_red", "white", "yellow"],
				"eg": ["black", "red", "white", "orange"],
				"ee": ["blue", "black", "white"],
				"er": ["light_blue", "green", "red", "yellow"],
				"gm": ["blue", "dark_green", "dark_red", "white"],
				"qa": ["dark_pink", "white"],
				"es": ["light_blue", "red", "white", "orange", "yellow"]}

				// Takes country and looks for countries using the same colors
				function getSimilar(country) {
					var colors = countries_colors[country];
					var res = []; // List of countries with the same colors
					for (country2 in countries_colors) {
						if (country2 != country) {
							var colors2 = countries_colors[country2];
							var similar = true;
							if (colors.length != colors2.length) {
								similar = false;
								continue;
							}
							for (var i = 0; i < colors.length; i++) {
								if (!colors2.includes(colors[i])) {
									similar = false;
									break;
								}
							}
							if (similar) {
								res.push(country2);
							}
						}
					}
					return res;
				}

				function setChildrenOpacity(element, number, stroke_color="red", stroke_width=4) {
					if (element === null || element.id == 'svg_map') {return;}
					element.style.opacity = number;
					element.style.stroke = stroke_color;
					element.style.strokeWidth = stroke_width;
					let pathElements = element.querySelectorAll('path');
					pathElements.forEach(function(pathElement) {
						try {
							pathElement.style.opacity = number;				
							pathElement.style.stroke = stroke_color;
							pathElement.style.strokeWidth = stroke_width;
						} catch {};
					});
					let circleElements = element.querySelectorAll('circle');
					circleElements.forEach(function(circleElement) {
						try {
							circleElement.style.opacity = number;				
							circleElement.style.stroke = stroke_color;
							circleElement.style.strokeWidth = stroke_width;
						} catch {};
					});
				}

				function resetColorCircles() {
					for (color in countries_by_color) {
						document.getElementById('circle_' + color).classList.remove('active-high-opacity');
						colors_clicked = [];
					}

				}

				function getCountryName(code) {
					return (COUNTRY_NAMES[currentLang] && COUNTRY_NAMES[currentLang][code])
						|| (COUNTRY_NAMES.en && COUNTRY_NAMES.en[code])
						|| code.toUpperCase();
				}

				// A few territories' plain flag file is just their parent country's
				// official flag (e.g. the French tricolor), but the color data here was
				// derived from their own distinct local/unofficial flag instead — so the
				// "-alt" asset is the one that actually matches these colors.
				const FLAG_FILE_OVERRIDES = { gf: 'gf-alt', nc: 'nc-alt' };
				function flagSrcFor(code) {
					return 'assets/color_flags/' + (FLAG_FILE_OVERRIDES[code] || code) + '.svg';
				}

				document.addEventListener('DOMContentLoaded', function() {
					const detailPlaceholder = document.getElementById('detailPlaceholder');
					const detailContent = document.getElementById('detailContent');
					const detailFlag = document.getElementById('detailFlag');
					const detailCountryName = document.getElementById('detailCountryName');
					const detailSimilarLabel = document.getElementById('detailSimilarLabel');
					const detailSimilarList = document.getElementById('detailSimilarList');
					const detailBlendContent = document.getElementById('detailBlendContent');
					const blendRealFlag = document.getElementById('blendRealFlag');
					const blendCountryName = document.getElementById('blendCountryName');
					const blendColorFlag = document.getElementById('blendColorFlag');
					const blendRgbLabel = document.getElementById('blendRgbLabel');

					// Grid `align-items: stretch` only equalizes the two columns up to
					// whichever has the TALLER natural content — a long similar-countries
					// list would otherwise grow past the map's own height instead of
					// scrolling internally. So the detail panel's height is pinned to the
					// map panel's actual rendered height explicitly (desktop 2-column
					// layout only; the panels stack on narrow/mobile widths).
					const mapPanel = document.querySelector('.map-panel');
					const detailPanel = document.querySelector('.detail-panel');
					function syncDetailPanelHeight() {
						const twoColumn = window.matchMedia('(min-width: 861px)').matches;
						const height = twoColumn ? mapPanel.offsetHeight : null;
						detailPanel.style.height = height ? height + 'px' : '';
						// The main flag is a quarter of the panel's height (falls back to a
						// fixed size when stacked on mobile, where there's no shared height).
						const flagSize = Math.round(height ? height * 0.25 : 110);
						detailFlag.style.width = flagSize + 'px';
						detailFlag.style.height = flagSize + 'px';
					}
					new ResizeObserver(syncDetailPanelHeight).observe(mapPanel);
					window.addEventListener('resize', syncDetailPanelHeight);
					syncDetailPanelHeight();

					// --- Map zoom: scales/pans #svg_map via CSS transform instead of
					// resizing #world-map's own box, so the container — and the detail
					// panel, kept in sync with it above — always stay the same size.
					const svgMap = document.getElementById('svg_map');
					const worldMap = document.getElementById('world-map');
					const zoomInBtn = document.getElementById('zoomInBtn');
					const zoomOutBtn = document.getElementById('zoomOutBtn');
					const ZOOM_MIN = 1;
					const ZOOM_MAX = 3;
					const ZOOM_STEP = 0.25;
					let mapZoom = ZOOM_MIN;
					let panX = 0;
					let panY = 0;

					// Keeps the container always fully covered by the scaled map: at
					// pan (0,0) the map overflows evenly on every side by
					// (zoom-1)*containerSize/2, so that's the furthest it can be
					// dragged before a blank edge would show.
					function clampPan() {
						const maxPanX = (mapZoom - 1) * worldMap.clientWidth / 2;
						const maxPanY = (mapZoom - 1) * worldMap.clientHeight / 2;
						panX = Math.max(-maxPanX, Math.min(maxPanX, panX));
						panY = Math.max(-maxPanY, Math.min(maxPanY, panY));
					}

					function applyMapTransform() {
						svgMap.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + mapZoom + ')';
					}

					// Sets an absolute zoom level while keeping the given point (in
					// #world-map-relative px; defaults to its center) visually fixed —
					// used for the +/- buttons (anchored at center) and pinch-zoom
					// (anchored at the pinch midpoint), via the same math.
					function applyZoomAt(newZoom, originX, originY) {
						const clamped = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, +newZoom.toFixed(3)));
						const rect = worldMap.getBoundingClientRect();
						const cx = originX === undefined ? rect.width / 2 : originX;
						const cy = originY === undefined ? rect.height / 2 : originY;
						const k = clamped / mapZoom;
						panX = (cx - rect.width / 2) * (1 - k) + panX * k;
						panY = (cy - rect.height / 2) * (1 - k) + panY * k;
						mapZoom = clamped;
						clampPan();
						applyMapTransform();
						worldMap.classList.toggle('zoomed', mapZoom > ZOOM_MIN);
						zoomInBtn.disabled = mapZoom >= ZOOM_MAX;
						zoomOutBtn.disabled = mapZoom <= ZOOM_MIN;
					}
					zoomInBtn.addEventListener('click', () => applyZoomAt(mapZoom + ZOOM_STEP));
					zoomOutBtn.addEventListener('click', () => applyZoomAt(mapZoom - ZOOM_STEP));
					window.addEventListener('resize', () => { clampPan(); applyMapTransform(); });
					applyZoomAt(mapZoom);

					// --- Drag to pan, and pinch to zoom on touch (via Pointer Events,
					// which report touch/mouse/pen through one API) ---
					const activePointers = new Map(); // pointerId -> {x, y} in client coords
					let dragStartX = 0;
					let dragStartY = 0;
					let dragOriginPanX = 0;
					let dragOriginPanY = 0;
					let dragMoved = false;
					let isPinching = false;
					let pinchLastDistance = 0;
					const DRAG_CLICK_THRESHOLD = 4; // px of movement before it counts as a drag, not a click

					function pointerPositions() { return Array.from(activePointers.values()); }
					function pointerDistance(pts) { return Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y); }
					function pointerMidpoint(pts) { return { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 }; }

					function startDragFrom(x, y) {
						dragStartX = x;
						dragStartY = y;
						dragOriginPanX = panX;
						dragOriginPanY = panY;
						svgMap.classList.add('no-transition');
						worldMap.classList.add('dragging');
					}

					worldMap.addEventListener('pointerdown', (event) => {
						if (event.pointerType === 'mouse' && event.button !== 0) return;
						event.preventDefault();
						activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
						worldMap.setPointerCapture(event.pointerId);

						if (activePointers.size === 2) {
							// A second finger landed — this is a pinch, not a drag.
							worldMap.classList.remove('dragging');
							isPinching = true;
							dragMoved = true; // suppress the click this gesture would otherwise end in
							pinchLastDistance = pointerDistance(pointerPositions());
						} else if (activePointers.size === 1 && mapZoom > ZOOM_MIN) {
							dragMoved = false;
							startDragFrom(event.clientX, event.clientY);
						}
					});

					worldMap.addEventListener('pointermove', (event) => {
						if (!activePointers.has(event.pointerId)) return;
						activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

						if (isPinching && activePointers.size === 2) {
							const pts = pointerPositions();
							const distance = pointerDistance(pts);
							const mid = pointerMidpoint(pts);
							const rect = worldMap.getBoundingClientRect();
							applyZoomAt(mapZoom * (distance / pinchLastDistance), mid.x - rect.left, mid.y - rect.top);
							pinchLastDistance = distance;
							return;
						}

						if (!worldMap.classList.contains('dragging')) return;
						const dx = event.clientX - dragStartX;
						const dy = event.clientY - dragStartY;
						if (!dragMoved && Math.hypot(dx, dy) > DRAG_CLICK_THRESHOLD) dragMoved = true;
						panX = dragOriginPanX + dx;
						panY = dragOriginPanY + dy;
						clampPan();
						applyMapTransform();
					});

					function endPointer(event) {
						activePointers.delete(event.pointerId);
						try { worldMap.releasePointerCapture(event.pointerId); } catch (e) { /* already released */ }
						if (activePointers.size < 2) isPinching = false;

						if (activePointers.size === 1 && mapZoom > ZOOM_MIN) {
							// One finger remains after a pinch — keep panning with it
							// instead of ending the gesture.
							const [remaining] = pointerPositions();
							startDragFrom(remaining.x, remaining.y);
							return;
						}

						if (!worldMap.classList.contains('dragging')) return;
						worldMap.classList.remove('dragging');
						svgMap.classList.remove('no-transition');
					}
					worldMap.addEventListener('pointerup', endPointer);
					worldMap.addEventListener('pointercancel', endPointer);

					// A drag or pinch gesture shouldn't also select the country under
					// the cursor when released (matches map UIs elsewhere, e.g. Google
					// Maps) — caught here in the capture phase, before it reaches the
					// per-country click handling below.
					worldMap.addEventListener('click', (event) => {
						if (dragMoved) {
							event.stopPropagation();
							dragMoved = false;
						}
					}, true);

					// --- Detail panel rendering (language-independent map-highlighting is
					// separate from this — this part only touches text, so it can be
					// re-run on a language switch without re-triggering any highlighting).
					let activeDetailView = null; // null | {type:'country', code} | {type:'colors', codes}

					function renderCountryList(codes, labelKeyBase, emptyMessageKey) {
						const labelKey = labelKeyBase + (codes.length === 1 ? 'One' : 'Other');
						detailSimilarLabel.textContent = t(STRINGS, labelKey).replace('{n}', codes.length);
						detailSimilarList.innerHTML = '';
						if (codes.length === 0) {
							const li = document.createElement('li');
							li.textContent = t(STRINGS, emptyMessageKey);
							detailSimilarList.appendChild(li);
							return;
						}
						codes
							.map((code) => ({ code, name: getCountryName(code) }))
							.sort((a, b) => a.name.localeCompare(b.name, currentLang))
							.forEach(({ code, name }) => {
								const li = document.createElement('li');
								li.className = 'detail-country-item';
								const flagImg = document.createElement('img');
								flagImg.className = 'detail-list-flag';
								flagImg.src = flagSrcFor(code);
								flagImg.alt = '';
								const nameSpan = document.createElement('span');
								nameSpan.textContent = name;
								li.appendChild(flagImg);
								li.appendChild(nameSpan);
								// Clicking a list entry behaves exactly like clicking that country on the map.
								li.addEventListener('click', () => clickCountryByCode(code));
								detailSimilarList.appendChild(li);
							});
					}

					function renderCountryPanel(countryName) {
						activeDetailView = { type: 'country', code: countryName };
						detailFlag.style.display = '';
						detailCountryName.style.display = '';
						detailSimilarLabel.style.display = '';
						detailSimilarList.style.display = '';
						detailFlag.src = flagSrcFor(countryName);
						detailFlag.alt = getCountryName(countryName);
						detailCountryName.textContent = getCountryName(countryName);
						renderCountryList(getSimilar(countryName), 'detailSimilarLabel', 'detailNoSimilar');
						detailPlaceholder.style.display = 'none';
						detailBlendContent.style.display = 'none';
						detailContent.style.display = 'flex';
					}

					function renderColorFilterPanel(codes) {
						activeDetailView = { type: 'colors', codes };
						detailFlag.style.display = 'none';
						detailCountryName.style.display = 'none';
						detailSimilarLabel.style.display = '';
						detailSimilarList.style.display = '';
						renderCountryList(codes, 'detailColorFilterLabel', 'detailNoColorMatch');
						detailPlaceholder.style.display = 'none';
						detailBlendContent.style.display = 'none';
						detailContent.style.display = 'flex';
					}

					// Blend mode: real_flags/<code>.svg is the actual official flag, shown
					// at its own aspect ratio (FLAG_ASPECT) rather than cropped to a circle,
					// next to a same-shaped swatch of the blended color plus its RGB value.
					// Stacked top-to-bottom, so width has more room to give than height
					// (two flags need to fit within the panel's height at once).
					const BLEND_FLAG_MAX_WIDTH = 150;
					const BLEND_FLAG_MAX_HEIGHT = 95;
					function sizeToAspect(ratio, maxWidth, maxHeight) {
						let width = maxWidth;
						let height = width / ratio;
						if (height > maxHeight) {
							height = maxHeight;
							width = height * ratio;
						}
						return { width: Math.round(width), height: Math.round(height) };
					}
					function hexToRgb(hex) {
						const n = parseInt(hex.slice(1), 16);
						return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
					}
					function renderBlendCountryPanel(countryName) {
						activeDetailView = { type: 'blend', code: countryName };
						const ratio = FLAG_ASPECT[countryName] || 1.5;
						const { width, height } = sizeToAspect(ratio, BLEND_FLAG_MAX_WIDTH, BLEND_FLAG_MAX_HEIGHT);
						blendRealFlag.src = 'assets/real_flags/' + countryName + '.svg';
						blendRealFlag.alt = getCountryName(countryName);
						blendRealFlag.style.width = width + 'px';
						blendRealFlag.style.height = height + 'px';
						blendCountryName.textContent = getCountryName(countryName);
						const color = BLEND_COLORS[countryName] || '#cccccc';
						blendColorFlag.style.width = width + 'px';
						blendColorFlag.style.height = height + 'px';
						blendColorFlag.style.backgroundColor = color;
						blendRgbLabel.textContent = 'rgb(' + hexToRgb(color).join(', ') + ')';
						detailPlaceholder.style.display = 'none';
						detailContent.style.display = 'none';
						detailBlendContent.style.display = 'flex';
					}

					onLangChange(() => {
						if (!activeDetailView) return;
						if (activeDetailView.type === 'country') renderCountryPanel(activeDetailView.code);
						else if (activeDetailView.type === 'blend') renderBlendCountryPanel(activeDetailView.code);
						else renderColorFilterPanel(activeDetailView.codes);
					});

					// --- Map opacity/highlighting helpers ---
					function resetMapOpacity() {
						// Scoped to the world map only — an earlier unscoped
						// `document.querySelectorAll('path')` here also matched the Blend
						// panel's shuffle-icon <path> elements and clobbered their stroke.
						document.querySelectorAll('#svg_map path').forEach(function(path) {
							try { path.style.opacity = 1; path.style.stroke = "white"; path.style.strokeWidth = 1; } catch {};
						});
						document.querySelectorAll('#svg_map circle').forEach(function(circle) {
							try { circle.style.opacity = 1; circle.style.stroke = "white"; circle.style.strokeWidth = 1; } catch {};
						});
					}

					function softenAllExcept(codes) {
						document.querySelectorAll('#svg_map path').forEach(function(path) {
							try { path.style.opacity = "0.2"; } catch {};
						});
						document.querySelectorAll('#svg_map circle').forEach(function(circle) {
							try { circle.style.opacity = "0.2"; } catch {};
						});
						codes.forEach((code) => setChildrenOpacity(document.getElementById(code), 1, "red", 4));
					}

					function resetToPlaceholder() {
						activeDetailView = null;
						detailContent.style.display = 'none';
						detailBlendContent.style.display = 'none';
						detailPlaceholder.style.display = '';
						resetMapOpacity();
						resetColorCircles();
					}

					// --- Pinning: a clicked country's info (and map highlight) stays put
					// until the user clicks empty map space, or a legend color, to unpin —
					// letting the user move the mouse to scroll the list without losing it.
					let pinnedCountry = null;

					// --- Color mode toggle: "Same color" (the original map/legend/
					// similar-countries behavior above) vs. "Blend" (every country
					// painted its own real-flag blended color; panel just shows that flag).
					const MODE_STORAGE_KEY = 'dirdam-flags-mode';
					const container = document.querySelector('.container');
					const modeToggleContainer = document.getElementById('modeToggle');
					const introText = document.getElementById('introText');
					let colorMode = localStorage.getItem(MODE_STORAGE_KEY) === 'blend' ? 'blend' : 'same';

					function applyBlendColors() {
						document.querySelectorAll('#svg_map path, #svg_map circle').forEach((element) => {
							const color = BLEND_COLORS[getCountryCodeFromElement(element)];
							if (color) element.style.fill = color;
						});
					}

					function clearBlendColors() {
						document.querySelectorAll('#svg_map path, #svg_map circle').forEach((element) => {
							element.style.fill = '';
						});
					}

					function updateModeDescription() {
						introText.innerHTML = t(STRINGS, colorMode === 'blend' ? 'introHtmlBlend' : 'introHtml');
						if (!activeDetailView) {
							detailPlaceholder.textContent = t(STRINGS, colorMode === 'blend' ? 'blendDetailPlaceholder' : 'detailPlaceholder');
						}
					}
					onLangChange(updateModeDescription);

					function renderModeToggle() {
						modeToggleContainer.innerHTML = '';
						[['same', 'modeSameColor'], ['blend', 'modeBlend']].forEach(([mode, labelKey]) => {
							const btn = document.createElement('button');
							btn.type = 'button';
							btn.textContent = t(STRINGS, labelKey);
							btn.setAttribute('aria-pressed', String(mode === colorMode));
							btn.addEventListener('click', () => setColorMode(mode));
							modeToggleContainer.appendChild(btn);
						});
					}
					onLangChange(renderModeToggle);

					function setColorMode(mode) {
						if (mode === colorMode) return;
						colorMode = mode;
						localStorage.setItem(MODE_STORAGE_KEY, mode);
						pinnedCountry = null;
						resetToPlaceholder();
						if (mode === 'blend') applyBlendColors();
						else clearBlendColors();
						container.classList.toggle('blend-mode', mode === 'blend');
						renderModeToggle();
						updateModeDescription();
					}

					if (colorMode === 'blend') {
						applyBlendColors();
						container.classList.add('blend-mode');
					}
					renderModeToggle();
					updateModeDescription();

					// A plain 2-letter code, optionally with a trailing "_"/"-" (used by
					// point-marker circles and coastal slivers), and nothing else.
					function idToCode(id) {
						const m = (id || '').match(/^([a-z]{2})[_-]?$/);
						return m ? m[1] : null;
					}

					function getCountryCodeFromElement(element) {
						// Prefer the element's OWN id when it's a real, known country code —
						// some territories (e.g. French Guiana, "gf") are nested inside a
						// DIFFERENT country's group (France, "fr") in the source map data,
						// so blindly preferring the parent breaks them. Only fall back to
						// the parent (and, failing that, the original length heuristic) for
						// oddly-nested fragment paths that don't carry a clean code of
						// their own (e.g. tiny sub-island slivers).
						const ownCode = idToCode(element.getAttribute('id'));
						if (ownCode && countries_colors[ownCode]) return ownCode;
						const parentId = element.parentNode.getAttribute('id') || '';
						const parentCode = idToCode(parentId);
						if (parentCode && countries_colors[parentCode]) return parentCode;
						let fallback = parentId;
						if (fallback.length > 3) fallback = element.getAttribute('id') || '';
						return fallback.substring(0, 2);
					}

					function showCountryAtElement(element, countryName, seedColorFilter) {
						resetColorCircles();
						renderCountryPanel(countryName);
						// Highlight the matching legend swatches
						countries_colors[countryName].forEach((color) => {
							document.getElementById('circle_' + color).classList.add('active-high-opacity');
						});
						// When pinning (not just hovering), the country's own colors become
						// the starting color filter — so clicking a further legend color
						// ADDS to it (intersects), instead of the pin's colors being shown
						// as merely visually highlighted but ignored by that filter.
						if (seedColorFilter) {
							colors_clicked = [...countries_colors[countryName]];
						}
						const similarCountries = getSimilar(countryName);
						softenAllExcept([countryName, ...similarCountries]);
						element.style.opacity = 1;
						element.style.stroke = "red";
						element.style.strokeWidth = 4;
						let parentElement = element.parentNode; // Look for parent (multi-part countries)
						setChildrenOpacity(parentElement, 1, "red", 4);
					}

					// Blend mode: every country is already painted its own blended color,
					// so there's nothing to soften/filter — just a border highlight plus
					// the real-flag panel.
					function showBlendCountryAtElement(element, countryName) {
						renderBlendCountryPanel(countryName);
						element.style.opacity = 1;
						element.style.stroke = "red";
						element.style.strokeWidth = 4;
						let parentElement = element.parentNode; // Look for parent (multi-part countries)
						setChildrenOpacity(parentElement, 1, "red", 4);
					}

					// Code -> one representative map element, so a click on a country
					// name in the detail-panel list can trigger the exact same behavior
					// as clicking that country directly on the map.
					const codeToElement = {};

					function clickCountryByCode(code) {
						const el = codeToElement[code];
						if (el) el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
					}

					document.querySelectorAll('#svg_map path, #svg_map circle').forEach(element => {
						const code = getCountryCodeFromElement(element);
						if (!codeToElement[code]) codeToElement[code] = element;

						element.addEventListener('mouseover', function() {
							if (pinnedCountry) return; // pinned — ignore hover elsewhere
							if (colorMode === 'blend') showBlendCountryAtElement(this, getCountryCodeFromElement(this));
							else showCountryAtElement(this, getCountryCodeFromElement(this));
						});

						element.addEventListener('mouseout', function() {
							if (pinnedCountry) return; // pinned — stays until explicitly unpinned
							resetToPlaceholder();
						});

						element.addEventListener('click', function(event) {
							event.stopPropagation();
							const clickedCountry = getCountryCodeFromElement(this);
							if (pinnedCountry === clickedCountry) { // clicking the pinned country again unpins it
								pinnedCountry = null;
								resetToPlaceholder();
								return;
							}
							pinnedCountry = clickedCountry;
							if (colorMode === 'blend') showBlendCountryAtElement(this, pinnedCountry);
							else showCountryAtElement(this, pinnedCountry, true);
						});
					});

					// Clicking empty map space (not a country) unpins and resets everything.
					document.getElementById('svg_map').addEventListener('click', function(event) {
						if (event.target.closest('path, circle')) return; // a country click, handled above
						pinnedCountry = null;
						resetToPlaceholder();
					});

					// Clear-selection swatch: deselects every active color (and unpins).
					const clearColorsButton = document.getElementById('legend-clear');
					function clearColorSelection() {
						pinnedCountry = null;
						resetToPlaceholder();
					}
					clearColorsButton.addEventListener('click', clearColorSelection);
					clearColorsButton.addEventListener('keydown', function(event) {
						if (event.key === 'Enter' || event.key === ' ') {
							event.preventDefault();
							clearColorSelection();
						}
					});

					// Select all the .legend-color elements (excluding the clear button)
					var circles = document.querySelectorAll('#map-legend .legend-color:not(.legend-clear)');

					// Add a click event listener to each color circle
					circles.forEach(function(circle) {
						circle.addEventListener('click', function() {
							pinnedCountry = null;
							// Highlight countries with the same color
							var color = circle.id.substring(7);
							// Toggle opacity between 0.2 and 1
							if (circle.classList.contains('active-high-opacity')) { // Unclick
								circle.classList.remove('active-high-opacity');
								colors_clicked.splice(colors_clicked.indexOf(color), 1); // Remove color from array
							} else { // Click
								circle.classList.add('active-high-opacity');
								if (!colors_clicked.includes(color)) {
									colors_clicked.push(color); // Add color to array
								}
							}
							// If no color chosen, reset to the default view
							if (colors_clicked.length === 0) {
								resetToPlaceholder();
								return;
							}
							// Find all countries which include every color in colors_clicked
							var countries_to_color = countries_by_color[colors_clicked[0]] || [];
							for (var i = 1; i < colors_clicked.length; i++) {
								let countries_to_color_set = new Set(countries_to_color);
								countries_to_color = countries_by_color[colors_clicked[i]].filter(element => countries_to_color_set.has(element));
							}
							softenAllExcept(countries_to_color);
							renderColorFilterPanel(countries_to_color);
						});
					});

				});
