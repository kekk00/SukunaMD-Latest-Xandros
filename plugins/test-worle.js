// plugins/wordle.mjs
import Jimp from 'jimp';
import crypto from 'crypto';

// === LISTA PAROLE (inserisci qui le tue 27k) ===
const WORDS = [
  'abate', 'abito', 'acari', 'acero', 'aceto', 'acido', 'acqua', 'adagi', 'adito', 'aereo',
  'afoso', 'agape', 'agile', 'agire', 'agrum', 'alare', 'alber', 'alcol', 'alibi', 'alice',
  'alito', 'allea', 'alleg', 'allod', 'altre', 'alzai', 'amaca', 'amaro', 'ambra', 'amica',
  'amico', 'amido', 'amore', 'ancor', 'anela', 'anice', 'anima', 'annoi', 'annua', 'annui',
  'ansia', 'antes', 'antro', 'anura', 'aorta', 'apice', 'apnea', 'appia', 'arare', 'arcai',
  'ardua', 'arduo', 'arena', 'argot', 'aring', 'armai', 'arnia', 'aroma', 'arare', 'asilo',
  'asola', 'aspro', 'assai', 'astio', 'atrio', 'attua', 'audio', 'aulir', 'aurea', 'aureo',
  'autun', 'avara', 'avaro', 'avere', 'avete', 'avida', 'avido', 'avrai', 'avuto', 'azera',
  'azoto', 'babbo', 'bacca', 'bacio', 'badia', 'baffi', 'bagno', 'balia', 'balla', 'balza',
  'bamba', 'bambu', 'banco', 'banda', 'bara', 'barca', 'barra', 'basco', 'basso', 'batte',
  'baule', 'beare', 'beata', 'beato', 'beffa', 'belga', 'bello', 'belva', 'benda', 'bene',
  'beone', 'berci', 'berla', 'besti', 'beuta', 'bevvi', 'bezzo', 'biada', 'bibbi', 'bicci',
  'bieta', 'bigia', 'bimba', 'bimbo', 'binar', 'biond', 'bioti', 'birba', 'birra', 'bisca',
  'bitta', 'bivio', 'bizza', 'bocca', 'bolla', 'bolle', 'bollo', 'bordo', 'borgo', 'boria',
  'borsa', 'bosco', 'botta', 'boxer', 'brama', 'brami', 'brici', 'briga', 'brina', 'brind',
  'brodo', 'bronz', 'bruci', 'bruma', 'bruna', 'bruno', 'bucce', 'budda', 'buffa', 'buffo',
  'bugia', 'bugna', 'bulbi', 'bullo', 'buona', 'buono', 'burla', 'burro', 'busta', 'butta',
  'cacao', 'cacca', 'cachi', 'cagna', 'calai', 'calca', 'calce', 'calci', 'calco', 'calda',
  'caldo', 'calma', 'calmo', 'calva', 'calvo', 'cambi', 'cameo', 'camma', 'campo', 'cane',
  'canne', 'canto', 'capii', 'capra', 'carbo', 'carne', 'carpa', 'carri', 'carta', 'casa',
  'casco', 'cassa', 'casta', 'casto', 'catta', 'causa', 'cauto', 'cavai', 'cecca', 'cedro',
  'celai', 'celia', 'cella', 'cenci', 'cenni', 'cento', 'cerai', 'cerca', 'cerco', 'cerna',
  'cerne', 'certo', 'cervo', 'cesio', 'cesso', 'cesta', 'cesti', 'chela', 'chilo', 'chimo',
  'china', 'chino', 'chiti', 'chius', 'ciano', 'ciao', 'cibai', 'cicca', 'ciclo', 'cieca',
  'cieco', 'cielo', 'cifra', 'cigno', 'cimai', 'cinse', 'cinque', 'cippi', 'circo', 'cispa',
  'cisti', 'citai', 'clero', 'clima', 'clone', 'cocco', 'cogli', 'colai', 'colle', 'collo',
  'colma', 'colmo', 'colpa', 'colse', 'colta', 'colto', 'combi', 'comma', 'conca', 'conci',
  'conio', 'conte', 'conto', 'copri', 'corai', 'corda', 'corno', 'corpo', 'corsa', 'corso',
  'corta', 'corte', 'corto', 'cosca', 'cosmo', 'costa', 'coste', 'cotta', 'cotte', 'cotto',
  'cozza', 'cozzo', 'crani', 'creai', 'creda', 'crede', 'credo', 'crema', 'crepe', 'crepi',
  'crespi', 'crici', 'crimi', 'crisi', 'croce', 'croll', 'crost', 'cruce', 'cucco', 'cuffa',
  'cugna', 'culla', 'cupio', 'curai', 'curia', 'curio', 'curva', 'curvo', 'cusco', 'cuspi',
  'dacci', 'dai', 'dalla', 'dallo', 'dammi', 'danza', 'dappi', 'dardo', 'darei', 'datti',
  'dazio', 'dea', 'debba', 'debol', 'degna', 'degno', 'deh', 'dei', 'delir', 'delta', 'demmo',
  'denno', 'densa', 'denso', 'dente', 'derby', 'derim', 'desco', 'desia', 'desto', 'deter',
  'detto', 'devia', 'diamo', 'diana', 'dica', 'dico', 'dieta', 'dieci', 'diodo', 'dirai',
  'dirla', 'dirsi', 'disco', 'disse', 'ditta', 'diva', 'diven', 'divin', 'dodici', 'dogma',
  'dolce', 'dolci', 'dolse', 'domai', 'donna', 'donne', 'dopai', 'dormi', 'dorso', 'dosai',
  'dote', 'dotta', 'dotti', 'dove', 'drago', 'drupa', 'dubbi', 'dubio', 'duca', 'dunno',
  'duomi', 'duomo', 'dupla', 'duple', 'durai', 'ebano', 'ebbio', 'ecche', 'ecco', 'edema',
  'edile', 'edili', 'edita', 'edito', 'educa', 'egida', 'egira', 'elchi', 'elegi', 'elfo',
  'elica', 'elogi', 'elsa', 'emaci', 'emana', 'emani', 'emulo', 'endem', 'enema', 'enfia',
  'enoli', 'entra', 'eolia', 'eolie', 'epica', 'epico', 'epoca', 'eppur', 'erari', 'erba',
  'erica', 'erige', 'ermai', 'eroe', 'eroi', 'errai', 'error', 'esame', 'esche', 'esigi',
  'esile', 'esimi', 'esito', 'esodi', 'esoso', 'esule', 'etani', 'etere', 'etica', 'etico',
  'etile', 'etnia', 'eunuc', 'evasa', 'evasi', 'evira', 'extra', 'faccia', 'faggi', 'fagli',
  'faina', 'falce', 'falci', 'falda', 'falla', 'falsa', 'falso', 'fame', 'fammi', 'fango',
  'farci', 'farro', 'farsi', 'fasca', 'fata', 'fatta', 'fatto', 'fauna', 'fava', 'favol',
  'febbi', 'felce', 'felpa', 'fenda', 'fende', 'fenna', 'feria', 'ferie', 'ferma', 'fermo',
  'ferri', 'ferro', 'fessa', 'fesso', 'festa', 'fetta', 'fiaba', 'fiala', 'fiato', 'fibra',
  'ficca', 'fieno', 'figli', 'filai', 'fili', 'firma', 'fisco', 'fissa', 'fisse', 'fissi',
  'fisso', 'fitta', 'fitto', 'fiume', 'fiuto', 'flora', 'fluii', 'fobia', 'foca', 'foche',
  'foggi', 'fogli', 'fogna', 'fondo', 'forai', 'forca', 'fori', 'forma', 'forni', 'forno',
  'forra', 'forte', 'forum', 'fosca', 'fosco', 'fossa', 'fosse', 'fossi', 'foste', 'fosti',
  'fotta', 'fotti', 'fotto', 'fra', 'frana', 'frase', 'frati', 'frega', 'frena', 'freno',
  'fresa', 'frese', 'frigo', 'frode', 'fruga', 'frula', 'fucil', 'fuga', 'fulvo', 'fumai',
  'fune', 'fuoch', 'fuori', 'furba', 'furbo', 'furia', 'furo', 'fusti', 'fusto', 'galea',
  'galla', 'gamba', 'gamma', 'ganci', 'gara', 'garza', 'gatta', 'gatto', 'gazza', 'gelai',
  'gelso', 'gemma', 'gener', 'genga', 'gergo', 'gessa', 'gesta', 'gesso', 'getto', 'ghepp',
  'ghisa', 'giall', 'gilda', 'girai', 'girio', 'gitta', 'gitti', 'gitto', 'globo', 'glori',
  'gnomo', 'gobba', 'gobbo', 'godai', 'golpe', 'gomit', 'gomma', 'gonfi', 'gonna', 'gorga',
  'gorgo', 'gozzo', 'gradi', 'grado', 'grafi', 'grama', 'gramo', 'grana', 'grano', 'grata',
  'grato', 'grava', 'gravi', 'grazi', 'greca', 'greco', 'gremi', 'grida', 'grifi', 'grill',
  'grond', 'gross', 'gru', 'gruzz', 'guada', 'guai', 'guari', 'guida', 'guidi', 'guizza',
  'gusta', 'gusti', 'gusto', 'icona', 'idoli', 'idolo', 'ienco', 'ietto', 'igloo', 'ilare',
  'illes', 'imani', 'imita', 'imola', 'imper', 'inane', 'incar', 'indio', 'inizi', 'inni',
  'intri', 'invii', 'iodio', 'iorda', 'iride', 'irite', 'ische', 'isola', 'ispra', 'issai',
  'itaca', 'itera', 'ivrea', 'jolly', 'kayak', 'kefir', 'ketch', 'labbo', 'labro', 'ladri',
  'lagna', 'laico', 'laina', 'lampa', 'lana', 'lance', 'lanci', 'largo', 'lasca', 'lasta',
  'latta', 'latti', 'laura', 'lava', 'lavor', 'leale', 'lecca', 'legai', 'legge', 'leggo',
  'legna', 'lemma', 'lenta', 'lenti', 'lento', 'lenza', 'leone', 'lepre', 'lerci', 'lesbi',
  'lesca', 'lessa', 'lessi', 'lesta', 'letto', 'levai', 'lezi', 'lezzo', 'libra', 'libri',
  'liceo', 'lieta', 'lieto', 'lieve', 'lievi', 'lilla', 'limai', 'limbo', 'limii', 'limite',
  'lince', 'linea', 'linfa', 'lirio', 'lisca', 'lissa', 'lista', 'lite', 'litio', 'litri',
  'lizza', 'lobbi', 'locale', 'lodai', 'lode', 'loghi', 'logli', 'lontra', 'lorda', 'lordo',
  'losca', 'losco', 'lotta', 'lotti', 'lotto', 'lucci', 'lucro', 'lugli', 'lui', 'lumac',
  'lume', 'luna', 'lunch', 'lunga', 'lungo', 'lupo', 'lurida', 'lurido', 'lutto', 'macero',
  'madia', 'madre', 'mafia', 'magia', 'magli', 'magma', 'magno', 'magro', 'mai', 'malga',
  'mallo', 'malta', 'mamba', 'mambo', 'mamma', 'manca', 'mance', 'manda', 'mando', 'mangi',
  'mango', 'mania', 'manna', 'manto', 'manzo', 'marca', 'marci', 'marea', 'marmo', 'marna',
  'marra', 'marrone', 'massa', 'masso', 'matto', 'mazza', 'meand', 'meato', 'mecen', 'medes',
  'media', 'medio', 'meglio', 'melma', 'menda', 'meni', 'mensa', 'mente', 'menti', 'mento',
  'merce', 'merci', 'merlo', 'mesce', 'messa', 'messe', 'messi', 'mesto', 'meteo', 'metri',
  'metta', 'mette', 'mezzo', 'mica', 'micio', 'miele', 'mieta', 'miglio', 'mille', 'milza',
  'mina', 'mince', 'minio', 'mirai', 'mirra', 'mise', 'missa', 'mista', 'misto', 'mitra',
  'mitri', 'mobil', 'mocci', 'modo', 'mogio', 'mole', 'molle', 'mollo', 'monca', 'monco',
  'mondo', 'monte', 'morbo', 'mordi', 'morfi', 'morsa', 'morse', 'morta', 'morto', 'mosca',
  'mosto', 'motel', 'motiv', 'mozza', 'mozzo', 'mucca', 'muffa', 'muggi', 'mulso', 'mulsa',
  'multa', 'munda', 'mungo', 'munse', 'muoia', 'muore', 'muovi', 'murag', 'murex', 'murga',
  'musai', 'musco', 'museo', 'musli', 'mussa', 'mutua', 'mutuo', 'nabab', 'nacri', 'nafta',
  'nanfa', 'nanna', 'narco', 'narri', 'naspi', 'nassa', 'nastr', 'natio', 'natta', 'nave',
  'nazca', 'necci', 'negai', 'neghi', 'negri', 'nembo', 'nenni', 'nervi', 'nesso', 'nesto',
  'netti', 'netto', 'neve', 'nevis', 'niche', 'nidi', 'ninfa', 'nipoti', 'nitri', 'nocca',
  'nodo', 'noema', 'nome', 'nomi', 'nonna', 'nonno', 'noria', 'norma', 'notai', 'notte',
  'novio', 'nozze', 'nubia', 'nubil', 'nucle', 'nulla', 'nuora', 'nuoto', 'nuovo', 'nutri',
  'obeli', 'obice', 'oblia', 'obolo', 'occhi', 'ocimo', 'oculi', 'odano', 'odiar', 'odino',
  'odori', 'offra', 'ogiva', 'oidio', 'oleum', 'oliva', 'olmi', 'oltra', 'omagg', 'omega',
  'omero', 'omise', 'oncia', 'onde', 'oneri', 'onice', 'opera', 'opino', 'oppio', 'orafa',
  'orale', 'orari', 'orata', 'orba', 'orbe', 'orchi', 'ordii', 'orfeo', 'organ', 'origl',
  'orlai', 'ornai', 'orobi', 'orrida', 'orrido', 'orsac', 'orso', 'orti', 'orza', 'orzar',
  'osai', 'osare', 'oscar', 'ossea', 'osseo', 'ossia', 'ostia', 'ostri', 'otite', 'otre',
  'ottri', 'ovale', 'ovest', 'ovile', 'ovini', 'ovoli', 'ovulo', 'oziai', 'ozono', 'pacca',
  'pacco', 'pachi', 'pacta', 'padre', 'paese', 'paggi', 'paghe', 'pagni', 'palco', 'palio',
  'palla', 'palma', 'palmo', 'palpo', 'palta', 'panca', 'panda', 'panna', 'panni', 'panno',
  'pansa', 'pappa', 'parca', 'parco', 'pareo', 'paria', 'parli', 'parte', 'parti', 'parve',
  'pasca', 'passa', 'passi', 'pasta', 'pasto', 'patre', 'patta', 'patti', 'paura', 'pausa',
  'pavia', 'peana', 'pecca', 'pecci', 'pece', 'pechi', 'pedio', 'peggi', 'pegni', 'pelai',
  'pelle', 'pelta', 'penai', 'pende', 'penna', 'pensa', 'pensi', 'penta', 'peone', 'peota',
  'pepai', 'pepli', 'pepsi', 'pera', 'perla', 'perni', 'persa', 'perse', 'pesai', 'pesca',
  'pesce', 'pesco', 'peste', 'petra', 'petti', 'petto', 'pezza', 'pezzo', 'piada', 'piani',
  'piano', 'piatto', 'pica', 'picea', 'piede', 'piega', 'piena', 'pieni', 'pieta', 'pigli',
  'pigna', 'pigne', 'pila', 'pili', 'pina', 'pinna', 'pinza', 'pinze', 'pioli', 'piove',
  'pipai', 'pira', 'pirla', 'pista', 'pitti', 'pitto', 'piuma', 'pizza', 'placa', 'placo',
  'plate', 'plebe', 'plichi', 'ploia', 'poche', 'podio', 'poema', 'poeta', 'poggi', 'poi',
  'polca', 'polli', 'pollo', 'polpa', 'polsi', 'pomfi', 'pompa', 'ponte', 'ponza', 'ponzi',
  'porci', 'porco', 'porge', 'porgo', 'porla', 'porre', 'porta', 'porto', 'porvi', 'posai',
  'posta', 'poste', 'potai', 'potei', 'potta', 'pover', 'pozza', 'pozzo', 'prana', 'prati',
  'prato', 'pravo', 'prece', 'preda', 'pregi', 'presa', 'prese', 'presi', 'prete', 'preti',
  'prima', 'primi', 'primo', 'priva', 'privo', 'proba', 'prode', 'prole', 'prora', 'prosa',
  'provi', 'prugn', 'pruni', 'pruno', 'puffi', 'pugil', 'pulce', 'pulii', 'pulsa', 'punci',
  'punga', 'pungi', 'punta', 'punti', 'punto', 'puppa', 'purch', 'purea', 'purga', 'putti',
  'putto', 'puzza', 'puzzo', 'quale', 'quasi', 'quota', 'racca', 'racco', 'radar', 'radio',
  'radon', 'raffa', 'ragni', 'ralle', 'ramai', 'ramni', 'rango', 'rapai', 'rasai', 'raspa',
  'rasta', 'ratei', 'ratio', 'ratta', 'razza', 'razzo', 'reale', 'reame', 'reati', 'reato',
  'rebbi', 'rebus', 'recai', 'rechi', 'recto', 'reda', 'redii', 'regal', 'regia', 'regio',
  'regna', 'reiki', 'relax', 'remai', 'rene', 'reni', 'renna', 'repli', 'reput', 'resta',
  'resti', 'rete', 'retro', 'retta', 'retto', 'revoc', 'riama', 'ribes', 'ricca', 'ricci',
  'ricco', 'ride', 'ridi', 'ridia', 'riemp', 'rifai', 'riffe', 'riful', 'rimai', 'rime',
  'rinca', 'ringa', 'rinta', 'rione', 'ripet', 'risa', 'risii', 'risma', 'risse', 'ritta',
  'rizza', 'rizzo', 'rocca', 'rocco', 'roche', 'roghi', 'rolio', 'rolla', 'romba', 'rombi',
  'ronca', 'ronco', 'ronza', 'rosai', 'rospo', 'rossa', 'rosso', 'rota', 'rotte', 'rotta',
  'rozzi', 'rubai', 'rubbi', 'rubeo', 'rubli', 'rubra', 'ruche', 'ruffa', 'ruga', 'rughe',
  'rulla', 'rumba', 'ruoli', 'ruota', 'rupe', 'ruppe', 'ruspa', 'ruspe', 'russa', 'russo',
  'rusta', 'sabba', 'sabbi', 'sabir', 'sacca', 'sacco', 'sacia', 'sacie', 'sacro', 'saghe',
  'saghi', 'sagra', 'saiga', 'salai', 'salda', 'saldo', 'salgo', 'salma', 'salmi', 'salpa',
  'salsa', 'salso', 'salta', 'salto', 'salva', 'salve', 'salvia', 'samba', 'sana', 'sanda',
  'sanno', 'sansa', 'santa', 'santo', 'saper', 'sapio', 'sapra', 'sarca', 'sarda', 'sardo',
  'sarei', 'sargo', 'sarta', 'sarti', 'sasso', 'satta', 'sauna', 'savia', 'sazio', 'sazia',
  'sbafa', 'sbaro', 'sbava', 'sbavi', 'sbavo', 'sbeff', 'sberla', 'sbovi', 'scada', 'scafa',
  'scala', 'scali', 'scalp', 'scana', 'scapa', 'scapi', 'scari', 'scart', 'scata', 'scema',
  'scemi', 'scena', 'scend', 'sceta', 'schei', 'schwa', 'scifi', 'sciol', 'sciro', 'scoli',
  'scopa', 'scopi', 'scopo', 'scota', 'scout', 'scova', 'scovo', 'screm', 'scudi', 'scudo',
  'scuoi', 'scura', 'scuro', 'sdazi', 'secca', 'secco', 'sedai', 'sedia', 'sedie', 'segai',
  'seggi', 'segre', 'segue', 'sele', 'sella', 'selle', 'selva', 'semel', 'senna', 'senza',
  'seppi', 'serba', 'serbi', 'seria', 'serie', 'serio', 'serpa', 'serra', 'serta', 'serva',
  'servi', 'sessa', 'setta', 'sette', 'sezzo', 'sfama', 'sfaro', 'sfasa', 'sfata', 'sfera',
  'sfida', 'sfiga', 'sfila', 'sfoca', 'sfoci', 'sfogo', 'sfora', 'sfreg', 'sgana', 'sghei',
  'siamo', 'siano', 'siero', 'sigla', 'sigma', 'silfo', 'simil', 'sinni', 'sinon', 'sirio',
  'sirma', 'sirte', 'sisma', 'sista', 'sistri', 'situa', 'slavo', 'slitta', 'sloga', 'smaga',
  'smalt', 'smash', 'smise', 'smott', 'soave', 'sobri', 'socia', 'socio', 'sodio', 'soffi',
  'sogli', 'sogno', 'soldi', 'sole', 'soli', 'solle', 'somma', 'sommo', 'sonar', 'sonda',
  'sonni', 'sonno', 'soppi', 'sopra', 'sorca', 'sorda', 'sordo', 'sorga', 'sorgo', 'sorse',
  'sorta', 'sosia', 'sosta', 'sotto', 'spada', 'spago', 'spala', 'spara', 'spari', 'sparo',
  'spazi', 'speco', 'spela', 'spele', 'spesa', 'spiga', 'spina', 'spine', 'spino', 'spira',
  'spola', 'spora', 'spore', 'sport', 'sposi', 'sposo', 'spray', 'spruzzo', 'spuma', 'spurgo',
  'sputa', 'sputo', 'squar', 'stadi', 'stai', 'stame', 'stana', 'stare', 'stata', 'state',
  'stati', 'stato', 'stava', 'stavi', 'steca', 'steli', 'stelo', 'steri', 'stero', 'stesa',
  'stile', 'stima', 'stira', 'stiro', 'stiva', 'stola', 'stona', 'stord', 'storm', 'stufa',
  'stufo', 'stura', 'suave', 'subbi', 'succhi', 'succo', 'sudai', 'sugna', 'suino', 'sultano',
  'summa', 'suola', 'suolo', 'suona', 'suono', 'super', 'surfa', 'surgi', 'sushi', 'sutra',
  'svele', 'svelo', 'sveva', 'svia', 'svita', 'svola', 'svolge', 'svuota', 'tabla', 'tacca',
  'tacco', 'tacer', 'tacit', 'tafia', 'tagli', 'talco', 'talea', 'talla', 'tallo', 'talpa',
  'tamer', 'tamia', 'tanca', 'tanga', 'tango', 'tanica', 'tanna', 'tanto', 'tappa', 'tappo',
  'tarai', 'tarda', 'tardi', 'tardo', 'targa', 'tarma', 'tarpa', 'tasca', 'tassa', 'tasso',
  'tasta', 'tasto', 'tatto', 'tazza', 'tazzo', 'tecca', 'tegame', 'tela', 'telai', 'temei',
  'tempi', 'tempo', 'tenda', 'tende', 'tener', 'tenga', 'tenia', 'tenne', 'tenni', 'tenta',
  'tenue', 'teppa', 'terga', 'terme', 'terna', 'terno', 'terra', 'tersa', 'terso', 'tesi',
  'tessa', 'testa', 'teste', 'testi', 'tetra', 'tetro', 'tetto', 'tibia', 'tiene', 'tigli',
  'tigna', 'tigre', 'timbra', 'tinca', 'tinta', 'tirai', 'tiro', 'tirsi', 'tizia', 'tizio',
  'tocca', 'tocco', 'toghe', 'togli', 'toppa', 'toppe', 'toppi', 'toppo', 'torba', 'torce',
  'tordo', 'torga', 'torio', 'torna', 'torne', 'torso', 'torta', 'torte', 'torto', 'tosai',
  'tossa', 'tosse', 'tosta', 'tosto', 'totem', 'tovaglie', 'tra', 'traca', 'trama', 'trame',
  'trani', 'trans', 'trata', 'trave', 'trema', 'tremi', 'tremo', 'treni', 'treno', 'tresa',
  'tribu', 'trici', 'trina', 'trini', 'trito', 'trivella', 'troia', 'troll', 'trona', 'troni',
  'trono', 'trota', 'trova', 'truca', 'truci', 'tubai', 'tuffa', 'tuffi', 'tulle', 'tumba',
  'tunica', 'tuono', 'turai', 'turba', 'turca', 'turco', 'tutsi', 'tutta', 'tutti', 'tutto',
  'ubbia', 'ubica', 'uccel', 'udire', 'udita', 'udito', 'ufficio', 'ugola', 'ulani', 'ulula',
  'umana', 'umano', 'umida', 'umido', 'umile', 'umore', 'unica', 'unico', 'unire', 'unita',
  'unito', 'untai', 'uoma', 'uova', 'urago', 'urani', 'urina', 'urlai', 'urli', 'urna',
  'urtai', 'usai', 'usare', 'usata', 'usato', 'usava', 'uscio', 'usura', 'utile', 'uvale',
  'va', 'vacuo', 'vadano', 'vaffa', 'vaga', 'vaghi', 'vagli', 'vai', 'valga', 'valgo',
  'valle', 'vampa', 'vanga', 'vanne', 'vanno', 'vanto', 'varca', 'varco', 'varia', 'varie',
  'vario', 'vasai', 'vasca', 'vasco', 'vasto', 've', 'vecia', 'vecce', 'vecia', 'veder',
  'vedra', 'veggi', 'veglia', 'vela', 'velai', 'vele', 'veli', 'velia', 'velo', 'venai',
  'venda', 'vende', 'vendi', 'vener', 'venia', 'venne', 'venti', 'vento', 'vepra', 'verbi',
  'verde', 'verga', 'verme', 'verro', 'versa', 'verso', 'verza', 'vespa', 'vesta', 'veste',
  'vetri', 'vetro', 'vezzo', 'viare', 'vibra', 'vicolo', 'video', 'vieni', 'vieta', 'vigli',
  'vigna', 'villa', 'vinca', 'vinci', 'viola', 'virai', 'virco', 'visse', 'vista', 'visti',
  'vita', 'vitae', 'vitta', 'vitti', 'viva', 'vivi', 'vizio', 'voci', 'voga', 'volai',
  'volare', 'volle', 'volpe', 'volse', 'volta', 'volti', 'volto', 'vorra', 'votai', 'vulgo',
  'vuota', 'vuoti', 'vuoto', 'wafer', 'watt', 'whisky', 'xenia', 'xenon', 'yankee', 'yeti',
  'yogurt', 'zaffo', 'zaino', 'zampa', 'zanna', 'zappi', 'zebra', 'zelo', 'zenit', 'zeppa',
  'zeppo', 'zitto', 'zolla', 'zona', 'zoppa', 'zoppo', 'zozza', 'zozzo', 'zucca', 'zuffa',
  'zuppa'
  // ...
];
const WORD_SET = new Set(WORDS);

// Stato delle partite
const state = new Map();

function todayStr() {
  const now = new Date();
  return now.toISOString().slice(0,10);
}

function seededPick(jid, day) {
  const hash = crypto.createHash('sha256').update(jid + '|' + day).digest();
  const num = hash.readUInt32BE(0);
  return WORDS[num % WORDS.length];
}

function scoreGuess(guess, target) {
  const res = Array(5).fill('⬛');
  const counts = {};
  for (const ch of target) counts[ch] = (counts[ch]||0)+1;
  for (let i=0;i<5;i++){
    if (guess[i]===target[i]) { res[i]='🟩'; counts[guess[i]]--; }
  }
  for (let i=0;i<5;i++){
    if (res[i]==='⬛' && counts[guess[i]]>0) {
      res[i]='🟨'; counts[guess[i]]--;
    }
  }
  return res;
}

async function renderBoard(tries, target) {
  const cell = 100, margin = 12;
  const rows = 5, cols = 5;
  const width = cols*cell + margin*2;
  const height = rows*cell + margin*3 + 80; // spazio extra sotto
  const img = new Jimp(width, height, '#f0f0f0'); // sfondo chiaro

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const fontSmall = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

  for (let r=0;r<rows;r++){
    const guess = tries[r];
    const result = guess ? scoreGuess(guess, target) : Array(cols).fill(null);

    for (let c=0;c<cols;c++){
      let color = '#d3d6da'; // vuoto
      if (result[c]==='🟩') color = '#6aaa64';
      else if (result[c]==='🟨') color = '#c9b458';
      else if (guess) color = '#787c7e';

      const x = margin + c*cell;
      const y = margin + r*cell;

      // disegna quadrato arrotondato
      const square = new Jimp(cell-4, cell-4, color);
      img.composite(square, x, y);

      // lettera centrata
      if (guess) {
        const letter = guess[c].toUpperCase();
        const w = Jimp.measureText(font, letter);
        const h = Jimp.measureTextHeight(font, letter, cell);
        const lx = x + (cell-w)/2;
        const ly = y + (cell-h)/2;
        img.print(font, lx, ly, letter);
      }
    }
  }

  // firma in basso
  const footer = "dev by Kekko «-» +39 351 726 7535";
  const fw = Jimp.measureText(fontSmall, footer);
  img.print(fontSmall, (width-fw)/2, height-30, footer);

  return await img.getBufferAsync(Jimp.MIME_PNG);
}

// === HANDLER ===
const handler = async (m, { conn, args, usedPrefix, command }) => {
  const jid = m.chat;
  const day = todayStr();

  let s = state.get(jid);
  if (!s || s.day !== day) {
    s = { day, target: seededPick(jid, day), tries: [], done: false };
    state.set(jid, s);
  }

  const guessRaw = (args[0] || '').toLowerCase();

  if (!guessRaw) {
    const buffer = await renderBoard(s.tries, s.target);
    return conn.sendMessage(jid, {
      image: buffer,
      caption: s.done
        ? `Partita finita! La parola era *${s.target.toUpperCase()}*`
        : `Wordle ${day}\nTentativi: ${s.tries.length}/5\nUsa: *${usedPrefix}${command} <parola>*`
    });
  }

  const guess = guessRaw.normalize('NFD').replace(/\p{Diacritic}/gu,'');
  if (guess.length !== 5) return m.reply('Serve una parola di *5* lettere.');
  if (!WORD_SET.has(guess)) return m.reply('Parola non nel dizionario.');
  if (s.done) return m.reply(`Partita già conclusa. Attendi domani!`);

  s.tries.push(guess);

  if (guess === s.target) {
    s.done = true;
    const buffer = await renderBoard(s.tries, s.target);
    return conn.sendMessage(jid, {
      image: buffer,
      caption: `🎉 Indovinato in ${s.tries.length}/5!\nParola: *${s.target.toUpperCase()}*`
    });
  }

  if (s.tries.length >= 5) {
    s.done = true;
    const buffer = await renderBoard(s.tries, s.target);
    return conn.sendMessage(jid, {
      image: buffer,
      caption: `❌ Tentativi finiti. La parola era *${s.target.toUpperCase()}*.`
    });
  }

  const buffer = await renderBoard(s.tries, s.target);
  return conn.sendMessage(jid, {
    image: buffer,
    caption: `${guess.toUpperCase()} giocato.\n${s.tries.length}/5 tentativi.`
  });
};

handler.help = ['wordle <parola>'];
handler.tags = ['game'];
handler.command = /^wordle$/i;

export default handler;