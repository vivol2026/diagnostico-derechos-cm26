const blocks = [
  { id: 'composicion', title: 'Composición', sub: 'Autoría de tus canciones — letra y música',
    questions: [
      '¿Sabes exactamente qué porcentaje de autoría (splits) le corresponde a cada integrante en tus canciones?',
      '¿Esos splits están documentados por escrito (acuerdo firmado o registro formal)?',
      '¿Tus composiciones están registradas ante SACM u otra sociedad de autores, y ya has recibido regalías por ello?'],
    why0: 'Sin splits claros, cualquier desacuerdo futuro entre integrantes se vuelve un conflicto legal sin resolver. Es la base de todo lo demás.',
    why1: 'Tienes claridad interna, pero sin registro formal no puedes cobrar regalías ni demostrar titularidad frente a un tercero.' },
  { id: 'conexos', title: 'Derechos conexos', sub: 'Tu rol como intérprete o productor de la grabación',
    questions: [
      '¿Sabes que como intérprete o productor de fonograma tienes derechos distintos a los de autor de la canción?',
      '¿Tienes tus créditos de intérprete/productor documentados, o estás afiliado a SOMEXFON, EJE?',
      '¿Ya has recibido algún pago por derechos conexos?'],
    why0: 'Los derechos conexos son de los menos entendidos en la industria mexicana — estar en SACM no cubre esto.',
    why1: 'Tener tu rol documentado es un paso real, aunque no se traduzca todavía en pagos.',
    contextNote: 'La afiliación a sociedades de gestión como SOMEXFON o EJE es notoriamente difícil de conseguir en México. Si no estás afiliado, no es necesariamente una falla tuya — documentar tus créditos desde ahora te deja listo para cuando sea posible.' },
  { id: 'masters', title: 'Masters', sub: 'Propiedad de las grabaciones',
    questions: [
      '¿Sabes con certeza quién es dueño legal de las grabaciones master de tu música?',
      '¿Tienes un contrato por escrito que defina esa propiedad?',
      '¿Generas ingresos directos por licenciamiento o venta de tus masters, más allá del streaming?'],
    why0: 'Sin saber quién es dueño del master, no puedes autorizar ni negar su uso, licenciarlo o venderlo.',
    why1: 'Tener el contrato es la base — el siguiente paso es que ese activo genere ingresos por sí mismo.' },
  { id: 'sync', title: 'Sincronización', sub: 'Uso de tu música en cine, TV, publicidad o videojuegos',
    questions: [
      '¿Sabes qué es sincronización y si tu música podría usarse en un proyecto audiovisual o publicitario?',
      '¿Tienes al menos una canción con metadata limpia y sin conflictos lista para ofrecerse en sync?',
      '¿Ya has colocado música en algún proyecto audiovisual, publicitario o de videojuegos?'],
    why0: 'La sincronización es la categoría de ingresos más subdesarrollada de la industria musical mexicana — casi nadie compite ahí todavía.',
    why1: 'Tener el catálogo listo es lo que separa a quien puede recibir una oferta de sync de quien no.' },
  { id: 'imagen', title: 'Imagen y marca', sub: 'El nombre y la identidad visual de tu proyecto',
    questions: [
      '¿Sabes qué partes de tu imagen son protegibles legalmente?',
      '¿El nombre de tu banda o proyecto está registrado como marca ante el IMPI?',
      '¿Ya has licenciado tu imagen o marca a un tercero?'],
    why0: 'Si otro proyecto o marca registra tu nombre antes que tú, perder el derecho a usarlo es un riesgo real.',
    why1: 'Registrar la marca protege el nombre — el siguiente paso es que genere valor comercial directo.' },
  { id: 'digital', title: 'Distribución digital', sub: 'Metadata y presencia en plataformas de streaming',
    questions: [
      '¿Sabes qué es un ISRC/ISWC y para qué sirven?',
      '¿Tu música tiene ISRC/ISWC asignados correctamente y estás afiliado a una distribuidora?',
      '¿Usas activamente datos de Spotify for Artists para tomar decisiones de tu proyecto?'],
    why0: 'Sin metadata correcta, tus regalías digitales pueden estar perdiéndose sin que lo sepas.',
    why1: 'Estar bien distribuido es la base — el diferencial es usar los datos para decidir mejor.' },
  { id: 'merch', title: 'Merchandising', sub: 'Diseños y productos de tu marca',
    questions: [
      '¿Sabes qué elementos de tu merch son protegibles por derecho de autor?',
      '¿Tienes un acuerdo por escrito que defina quién es dueño de esos derechos de uso?',
      '¿El merch te genera ingresos recurrentes, más allá de venderlo en shows?'],
    why0: 'Sin acuerdo claro, un diseñador freelance podría ser legalmente dueño de un diseño que consideras tuyo.',
    why1: 'Tener los derechos claros es el paso base — el siguiente nivel es ingreso recurrente.' },
  { id: 'audiencia', title: 'Datos de audiencia', sub: 'Tu relación directa con tus fans, más allá de las plataformas',
    questions: [
      '¿Sabes qué datos de tu audiencia podrías estar recolectando además de seguidores en redes?',
      '¿Tienes una base de datos propia de tus fans, independiente de las plataformas sociales?',
      '¿Usas esa base activamente para vender boletos, merch o mantener contacto directo?'],
    why0: 'Depender solo de redes sociales significa que un cambio de algoritmo puede cortar tu única forma de llegar a tu audiencia.',
    why1: 'Tener la base es el activo — usarla activamente la convierte en un canal de ingreso real.' }
];

const benchmark = { composicion: 45, conexos: 18, masters: 30, sync: 12, imagen: 25, digital: 55, merch: 20, audiencia: 15 };
const priority = ['sync', 'conexos', 'digital', 'masters', 'composicion', 'imagen', 'merch', 'audiencia'];
const levelLabels = ['Inexistente', 'Básico', 'Protegido', 'Explotado'];

const consentItems = [
  { num: '01', text: 'Esto es una herramienta educativa, no asesoría legal. Te ayuda a identificar dónde estás parado.' },
  { num: '02', text: 'Tus respuestas individuales son privadas. Solo tú ves tu diagnóstico completo.' },
  { num: '03', text: 'Los datos agregados y anónimos por comunidad pueden usarse en reportes de Conexión México.' }
];

const state = {
  screen: 'consent',
  consentChecked: false,
  current: 0,
  answers: blocks.map(() => [null, null, null])
};

function levelForBlock(i) {
  let lvl = 0;
  for (const a of state.answers[i]) {
    if (a === 'si') lvl++;
    else break;
  }
  return lvl;
}

function renderConsentScreen() {
  const canStart = state.consentChecked;
  return `
    <div class="screen consent-screen">
      <div class="eyebrow"><span class="eyebrow-dash"></span>Diagnóstico de derechos</div>
      <h1 class="consent-title">¿Qué tan protegido está el <span style="color:var(--accent)">negocio</span> detrás de tu música?</h1>
      <p class="consent-body">Un diagnóstico educativo de 8 bloques sobre las posibilidades de negocio de tus derechos: composición, derechos conexos, masters, sincronización, imagen, distribución digital, merchandising y datos de audiencia. Toma entre 10 y 15 minutos.</p>
      <div class="card consent-card">
        <p class="card-label">Antes de empezar</p>
        <div>
          ${consentItems.map(item => `
            <div class="consent-item">
              <span class="consent-num">${item.num}</span>
              <span class="consent-text">${item.text}</span>
            </div>
          `).join('')}
        </div>
        <label class="consent-checkbox">
          <input type="checkbox" data-action="toggle-consent" ${state.consentChecked ? 'checked' : ''}>
          <span>Entiendo que esto es una herramienta educativa y acepto que mis respuestas agregadas y anónimas puedan usarse en reportes de Conexión México.</span>
        </label>
        <button class="btn-primary" data-action="start" ${canStart ? '' : 'disabled'}>Comenzar diagnóstico →</button>
      </div>
    </div>
  `;
}

function renderQuizScreen() {
  const { current, answers } = state;
  const block = blocks[current];
  const numLabel = String(current + 1).padStart(2, '0');
  const canNext = answers[current].every(a => a !== null);
  const isLast = current === blocks.length - 1;

  const progressSegs = blocks.map((_, i) => {
    const cls = i < current ? 'done' : i === current ? 'current' : '';
    return `<div class="progress-seg ${cls}"></div>`;
  }).join('');

  const questionsHtml = block.questions.map((qtext, qi) => {
    const optionsHtml = ['si', 'no', 'nosé'].map(val => {
      const selected = answers[current][qi] === val;
      const label = val === 'si' ? 'Sí' : val === 'no' ? 'No' : 'No sé';
      return `<div class="option-btn ${selected ? 'selected' : ''}" data-value="${val}" data-action="select" data-block="${current}" data-question="${qi}" data-answer="${val}">${label}</div>`;
    }).join('');
    return `
      <div class="question-block">
        <p class="question-text">${qtext}</p>
        <div class="options">${optionsHtml}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="screen quiz-screen">
      <div class="progress-track">${progressSegs}</div>
      <div class="progress-label">Bloque ${current + 1} de ${blocks.length}</div>
      <div class="card quiz-card">
        <div class="quiz-header">
          <div class="quiz-circle"><span>${numLabel}</span></div>
          <h2 class="quiz-title">${block.title}</h2>
        </div>
        <p class="quiz-sub">${block.sub}</p>
        ${block.contextNote ? `<div class="context-note">${block.contextNote}</div>` : ''}
        ${questionsHtml}
        <div class="quiz-footer">
          <button class="btn-back ${current === 0 ? 'hidden' : ''}" data-action="back">← Atrás</button>
          <button class="btn-next" data-action="next" ${canNext ? '' : 'disabled'}>${isLast ? 'Ver diagnóstico →' : 'Siguiente →'}</button>
        </div>
      </div>
    </div>
  `;
}

function renderResultsScreen() {
  const levels = blocks.map((_, i) => levelForBlock(i));

  const resultBarsHtml = blocks.map((b, i) => {
    const lvl = levels[i];
    const segsHtml = [0, 1, 2].map(s => `<div class="bar-seg ${s < lvl ? 'filled' : ''}"></div>`).join('');
    return `
      <div class="bar-row">
        <div class="bar-title">${b.title}</div>
        <div class="bar-segs">${segsHtml}</div>
        <div class="bar-level">${levelLabels[lvl]}</div>
      </div>
    `;
  }).join('');

  const minLevel = Math.min(...levels);
  const candidates = blocks
    .map((b, i) => ({ b, i }))
    .filter(x => levels[x.i] === minLevel)
    .sort((x, y) => priority.indexOf(x.b.id) - priority.indexOf(y.b.id));
  const recBlock = candidates[0].b;
  const recIdx = candidates[0].i;
  const recommended = {
    title: recBlock.title,
    text: levels[recIdx] === 0 ? recBlock.why0 : recBlock.why1
  };

  const detailItems = blocks
    .map((b, i) => ({ b, i, lvl: levels[i] }))
    .filter(x => x.lvl <= 1);
  const hasDetail = detailItems.length > 0;

  const detailHtml = detailItems.map(x => `
    <div class="detail-item">
      <div class="detail-item-header">
        <h4 class="detail-item-title">${x.b.title}</h4>
        <span class="detail-tag" data-level="${x.lvl}">${levelLabels[x.lvl]}</span>
      </div>
      <p class="detail-item-text">${x.lvl === 0 ? x.b.why0 : x.b.why1}</p>
      ${x.b.contextNote ? `<div class="context-note">${x.b.contextNote}</div>` : ''}
    </div>
  `).join('');

  const badgesHtml = blocks.map((b, i) => {
    const lvl = levels[i];
    const qualifies = lvl >= 2;
    const pct = benchmark[b.id];
    return `
      <div class="badge-card ${qualifies ? 'qualifies' : ''}">
        <div class="badge-pct">${pct}%</div>
        <div class="badge-text">tiene <b>${b.title}</b> en nivel protegido+</div>
        <div class="badge-status">${qualifies ? '✓ Ya formas parte' : 'Aún no'}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="screen results-screen">
      <div class="eyebrow" style="margin-bottom:14px">Tu diagnóstico</div>
      <h1 class="results-title">Este es el mapa actual de tus derechos.</h1>
      <p class="results-intro">No es un examen de aprobado o reprobado — es una foto de dónde tienes cada área protegida, y dónde hay una oportunidad que todavía no explotas.</p>

      <div class="card bars-card">
        <p class="card-label">Nivel de madurez por bloque</p>
        ${resultBarsHtml}
      </div>

      <div class="recommend-card">
        <div class="recommend-label">Tu siguiente paso recomendado</div>
        <h3 class="recommend-title">Empieza por ${recommended.title}</h3>
        <p class="recommend-text">${recommended.text}</p>
      </div>

      ${hasDetail ? `
        <div class="card detail-card">
          <p class="card-label">Detalle por bloque</p>
          ${detailHtml}
        </div>
      ` : `
        <div class="card no-detail-card">
          <p>Tienes al menos nivel "Protegido" en los 8 bloques — un perfil poco común. El siguiente reto es convertir más de esto en ingreso activo.</p>
        </div>
      `}

      <h3 class="community-title">Comunidad Conexión México</h3>
      <p class="community-sub">Así te comparas con quienes ya tomaron el diagnóstico.</p>
      <div class="badges-grid">${badgesHtml}</div>
      <p class="disclaimer">* Los porcentajes de comunidad son ilustrativos en esta primera versión.</p>
    </div>
  `;
}

function render() {
  const app = document.getElementById('app');
  if (state.screen === 'consent') app.innerHTML = renderConsentScreen();
  else if (state.screen === 'quiz') app.innerHTML = renderQuizScreen();
  else app.innerHTML = renderResultsScreen();
}

document.getElementById('app').addEventListener('click', (e) => {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'toggle-consent') {
    state.consentChecked = !state.consentChecked;
    render();
  } else if (action === 'start') {
    if (state.consentChecked) {
      state.screen = 'quiz';
      render();
    }
  } else if (action === 'select') {
    const bi = Number(target.dataset.block);
    const qi = Number(target.dataset.question);
    const val = target.dataset.answer;
    state.answers[bi][qi] = val;
    render();
  } else if (action === 'back') {
    if (state.current > 0) {
      state.current -= 1;
      render();
    }
  } else if (action === 'next') {
    const allAnswered = state.answers[state.current].every(a => a !== null);
    if (!allAnswered) return;
    if (state.current < blocks.length - 1) {
      state.current += 1;
    } else {
      state.screen = 'results';
    }
    render();
  }
});

render();
