(() => {
  const world = document.querySelector('.office-world');
  const room = document.querySelector('.office-room');
  if (!world || !room) return;

  const plane = (className, x, y, z, width, height, options = {}) => {
    const item = document.createElement('div');
    item.className = className;
    item.style.width = `${width}vw`;
    item.style.height = `${height}vh`;
    item.style.transform = `translate3d(calc(${x}vw - 50%),calc(${y}vh - 50%),${z}vw) rotateX(${options.rx || 0}deg) rotateY(${options.ry || 0}deg) rotateZ(${options.rz || 0}deg)`;
    if (options.color) item.style.background = options.color;
    if (options.image) item.style.backgroundImage = `url("${encodeURI(options.image)}")`;
    if (options.position) item.style.backgroundPosition = options.position;
    if (options.size) item.style.backgroundSize = options.size;
    room.append(item);
    return item;
  };

  const box = (x, y, z, width, height, depth, material = 'walnut', extraClass = '') => {
    const item = document.createElement('div');
    item.className = `office-box office-box--${material} ${extraClass}`;
    item.style.transform = `translate3d(${x}vw,${y}vh,${z}vw)`;
    const faces = [
      ['front', width, height, `translate(-50%,-50%) translateZ(${depth / 2}vw)`],
      ['back', width, height, `translate(-50%,-50%) rotateY(180deg) translateZ(${depth / 2}vw)`],
      ['left', depth, height, `translate(-50%,-50%) rotateY(-90deg) translateZ(${width / 2}vw)`],
      ['right', depth, height, `translate(-50%,-50%) rotateY(90deg) translateZ(${width / 2}vw)`],
      ['top', width, depth, `translate(-50%,-50%) rotateX(90deg) translateZ(${height / 2}vh)`],
      ['bottom', width, depth, `translate(-50%,-50%) rotateX(-90deg) translateZ(${height / 2}vh)`],
    ];
    faces.forEach(([name, faceWidth, faceHeight, transform]) => {
      const face = document.createElement('i');
      face.className = `office-box-face office-box-face--${name}`;
      face.style.width = `${faceWidth}vw`;
      face.style.height = `${faceHeight}${name === 'top' || name === 'bottom' ? 'vw' : 'vh'}`;
      face.style.transform = transform;
      item.append(face);
    });
    room.append(item);
    return item;
  };

  const photoFrame = (image, x, y, z, width, height, ry = 0, rx = 0, position = 'center') => {
    const frame = plane('office-photo-frame', x, y, z, width + 2, height + 2, { ry, rx });
    const print = document.createElement('div');
    print.className = 'office-photo-print';
    print.style.backgroundImage = `url("${encodeURI(image)}")`;
    print.style.backgroundPosition = position;
    print.style.width = `${width}vw`;
    print.style.height = `${height}vh`;
    frame.append(print);
    return frame;
  };

  const facePanel = (x, y, z, width, height, ry = 0, text = '') => {
    const panel = plane('office-nameplate', x, y, z, width, height, { ry });
    if (text) panel.textContent = text;
    return panel;
  };

  // One connected shell: polished floor, walnut walls, a vaulted ceiling, and an open entry.
  plane('office-surface office-floor', 0, 36, -610, 174, 1280, { rx: 90 });
  plane('office-surface office-ceiling', 0, -46, -610, 174, 1280, { rx: -90 });
  plane('office-surface office-wall office-wall--left', -84, -4, -610, 1280, 86, { ry: 90 });
  plane('office-surface office-wall office-wall--right', 84, -4, -610, 1280, 86, { ry: -90 });
  plane('office-surface office-back-wall', 0, -4, -1260, 170, 86);

  // Entry surround, exterior view, and the first illuminated name wall.
  box(-31, -2, 42, 3.2, 43, 2.2, 'brass');
  box(31, -2, 42, 3.2, 43, 2.2, 'brass');
  box(0, -24, 42, 66, 3.4, 2.5, 'brass');
  photoFrame('assets/01_GJS_Firm_Exterior.jpg', 0, -5, 75, 112, 51, 0, 0, '67% center');
  facePanel(0, -31, 42.8, 28, 7, 0, 'GJS  /  ADVOCATES & SOLICITORS');

  // Distinct photographic panels are mounted within the rooms as art and environmental detail.
  photoFrame('assets/03_GJS_Office_Corridor.jpg', -82.6, -5, -205, 67, 35, 90, 0, '30% center');
  photoFrame('assets/04_GJS_Reception.jpg', -75, -7, -330, 55, 32, 90, 0, '25% center');
  photoFrame('assets/07_GJS_Practice_Areas.jpg', 82.6, -4, -540, 57, 36, -90, 0, 'center');
  photoFrame('assets/02_GJS_Legal_Desk.jpg', -82.6, -4, -780, 62, 35, 90, 0, 'center');
  photoFrame('assets/05_GJS_Executive_Office.jpg', 0, -5, -1085, 105, 52, 0, 0, 'center');
  photoFrame('assets/06_GJS_Client_Consultation.jpg', 82.6, -5, -1150, 65, 37, -90, 0, 'center');
  photoFrame('assets/08_GJS_Consultation.jpg', 43, 25.4, -1180, 29, 19, 0, 90, 'center');

  // Recessed timber panels and narrow brass reveal lines down the corridor.
  for (let index = 0; index < 12; index++) {
    const z = 2 - index * 92;
    plane('office-trim office-trim--left', -82.7, -3, z, 1.4, 76, { ry: 90 });
    plane('office-trim office-trim--right', 82.7, -3, z, 1.4, 76, { ry: -90 });
    plane('office-light-strip', 0, -43, z, 42, 0.5, { rx: 90 });
    box(-77.4, -9, z, 2.2, 15, 2.2, 'brass', 'office-sconce');
    box(77.4, -9, z, 2.2, 15, 2.2, 'brass', 'office-sconce');
  }

  // Reception desk and guest seating.
  box(-42, 27, -300, 33, 13, 18, 'marble', 'office-desk');
  box(-42, 27, -290, 29, 12, 1.4, 'walnut');
  box(-56, 18.5, -311, 2.4, 35, 2.4, 'brass');
  box(-29, 18.5, -311, 2.4, 35, 2.4, 'brass');
  facePanel(-42, 27, -290.8, 11, 4.5, 0, 'GJS');
  box(-21, 23, -270, 17, 19, 15, 'leather', 'office-sofa');
  box(-21, 31, -263, 17, 5, 17, 'leather');
  box(-62, 21, -373, 18, 24, 13, 'leather', 'office-chair');
  box(-62, 32, -365, 18, 5, 15, 'leather');

  // Wall library, inlaid shelves, and brass-lit legal volumes.
  box(67, -2, -625, 20, 54, 16, 'walnut', 'office-bookcase');
  for (let row = 0; row < 4; row++) {
    box(67, -25 + row * 14, -615, 21, 1.2, 17, 'brass');
    for (let column = 0; column < 8; column++) {
      const bookHeight = 6 + ((column * 7 + row * 3) % 5);
      box(58 + column * 2.55, -31 + row * 14 + bookHeight / 2, -614, 1.65, bookHeight, 2.6, column % 3 === 0 ? 'book-gold' : 'book-dark', 'office-book');
    }
  }

  // Executive desk, monitor, case files, and a high-backed chair.
  box(0, 31, -930, 37, 8, 22, 'marble', 'office-desk');
  box(0, 30, -920, 33, 11, 1.6, 'walnut');
  box(-15, 31, -938, 2.4, 10, 2.4, 'brass');
  box(15, 31, -938, 2.4, 10, 2.4, 'brass');
  box(0, 14, -960, 18, 21, 2, 'screen', 'office-monitor');
  box(0, 25, -959, 4, 6, 2, 'brass');
  box(0, 16, -824, 19, 22, 15, 'leather', 'office-chair');
  box(0, 31, -816, 19, 5, 16, 'leather');
  box(24, 26, -946, 8, 1.5, 8, 'book-gold', 'office-casebook');

  // Client room: long table, chairs, and a softer pool of warm light.
  box(43, 28, -1180, 39, 5, 24, 'marble', 'office-table');
  box(27, 33.2, -1188, 2.2, 6, 2.2, 'brass');
  box(59, 33.2, -1188, 2.2, 6, 2.2, 'brass');
  box(27, 33.2, -1172, 2.2, 6, 2.2, 'brass');
  box(59, 33.2, -1172, 2.2, 6, 2.2, 'brass');
  for (let side = -1; side <= 1; side += 2) {
    for (let seat = 0; seat < 3; seat++) {
      const x = 43 + seat * 15 - 15;
      const z = -1250 + side * 20;
      box(x, 24, z, 9, 23, 8, 'leather', 'office-chair');
      box(x, 33, z + side * 4, 9, 5, 9, 'leather');
    }
  }

  // Potted greenery in the reception and consultation rooms.
  const addPlant = (x, z, scale = 1) => {
    box(x, 28, z, 8 * scale, 12 * scale, 8 * scale, 'stone', 'office-planter');
    for (let leaf = 0; leaf < 7; leaf++) {
      const angle = leaf * 51.43;
      const leafX = x + Math.cos(angle * Math.PI / 180) * 8 * scale;
      const leafY = 13 - (leaf % 3) * 3;
      const leafZ = z + Math.sin(angle * Math.PI / 180) * 8 * scale;
      plane('office-leaf', leafX, leafY, leafZ, 4.2 * scale, 13 * scale, { ry: angle, rz: (leaf % 2 ? 12 : -12) });
    }
  };
  addPlant(-68, -275, 1.2);
  addPlant(69, -478, .9);
  addPlant(71, -1180, 1.1);

  // Floating amber dust catches the architectural light without covering the copy.
  for (let mote = 0; mote < 22; mote++) {
    const x = ((mote * 47) % 150) - 75;
    const y = ((mote * 29) % 58) - 27;
    const z = -80 - ((mote * 97) % 1160);
    const speck = plane('office-mote', x, y, z, .36 + (mote % 3) * .12, .36 + (mote % 3) * .12);
    speck.style.animationDelay = `${(mote % 8) * -.7}s`;
  }

  const path = [
    { x: 0, y: 0, z: 160, yaw: 0, pitch: 0, roll: 0, zoom: 1.0 },
    { x: 0, y: 0, z: 30, yaw: 0, pitch: 0, roll: 0, zoom: 1.03 },
    { x: -39, y: 0, z: -265, yaw: -27, pitch: 0.4, roll: -0.6, zoom: 1.035 },
    { x: -11, y: 0, z: -545, yaw: 22, pitch: -0.6, roll: 0.5, zoom: 1.02 },
    { x: 4, y: 0, z: -790, yaw: -15, pitch: 0.5, roll: -0.45, zoom: 1.04 },
    { x: 0, y: 0, z: -865, yaw: 5, pitch: 0.3, roll: 0.35, zoom: 1.065 },
    { x: 30, y: 0, z: -1090, yaw: 35, pitch: -0.7, roll: 0.7, zoom: 1.04 },
    { x: 43, y: 0, z: -1135, yaw: -12, pitch: 0.2, roll: -0.15, zoom: 1.045 },
  ];
  const stopsAt = [
    0,
    ['#approach', 0.08],
    ['#practice', 0.05],
    ['#practice', 0.61],
    ['.people-section', 0.08],
    ['.people-section', 0.67],
    ['#perspective', 0.12],
    ['#contact', 0.18],
  ];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cameraNow = { ...path[0] };
  const cameraTarget = { ...path[0] };
  let pointerX = 0;
  let pointerY = 0;
  let pointerNowX = 0;
  let pointerNowY = 0;
  let active = true;

  function updateCameraTarget() {
    const stops = stopsAt.map((stop) => {
      if (typeof stop === 'number') return stop;
      const [selector, fraction] = stop;
      const section = document.querySelector(selector);
      return section ? section.getBoundingClientRect().top + window.scrollY + section.offsetHeight * fraction : 0;
    });
    for (let index = 1; index < stops.length; index++) stops[index] = Math.max(stops[index], stops[index - 1] + 1);
    const scrollY = reduceMotion.matches ? 0 : window.scrollY;
    let index = 0;
    while (index < stops.length - 2 && scrollY > stops[index + 1]) index++;
    const fraction = Math.max(0, Math.min(1, (scrollY - stops[index]) / Math.max(stops[index + 1] - stops[index], 1)));
    const eased = fraction * fraction * (3 - 2 * fraction);
    const from = path[index];
    const to = path[Math.min(path.length - 1, index + 1)];
    for (const key of Object.keys(cameraTarget)) cameraTarget[key] = from[key] + (to[key] - from[key]) * eased;
    if (reduceMotion.matches) renderCamera(true);
  }

  function renderCamera(once = false) {
    if (!active && !once) return;
    if (reduceMotion.matches) Object.assign(cameraNow, cameraTarget);
    else {
      const smooth = 0.075;
      for (const key of Object.keys(cameraNow)) cameraNow[key] += (cameraTarget[key] - cameraNow[key]) * smooth;
    }
    const motionEase = reduceMotion.matches ? 1 : .09;
    pointerNowX += (pointerX - pointerNowX) * motionEase;
    pointerNowY += (pointerY - pointerNowY) * motionEase;
    room.style.transform = `scale(${cameraNow.zoom}) rotateZ(${-cameraNow.roll}deg) rotateX(${-cameraNow.pitch - pointerNowY * .65}deg) rotateY(${-cameraNow.yaw - pointerNowX * 1.05}deg) translate3d(${-cameraNow.x - pointerNowX * 1.6}vw,${-cameraNow.y - pointerNowY * .65}vh,${-cameraNow.z}vw)`;
    const pageProgress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    world.style.setProperty('--world-progress', String(pageProgress));
    world.style.setProperty('--light-shift', `${pageProgress * 8}vw`);
    if (!once && !reduceMotion.matches) requestAnimationFrame(() => renderCamera());
  }

  window.addEventListener('scroll', updateCameraTarget, { passive: true });
  window.addEventListener('resize', updateCameraTarget, { passive: true });
  window.addEventListener('pointermove', (event) => {
    if (reduceMotion.matches || event.pointerType === 'touch') return;
    pointerX = (event.clientX / window.innerWidth - .5) * 1.1;
    pointerY = (event.clientY / window.innerHeight - .5) * -1.1;
  }, { passive: true });
  document.addEventListener('mouseleave', () => { pointerX = 0; pointerY = 0; }, { passive: true });
  document.addEventListener('visibilitychange', () => { active = document.visibilityState === 'visible'; if (active) renderCamera(); });
  const visibilityObserver = new IntersectionObserver(([entry]) => { active = entry.isIntersecting && document.visibilityState === 'visible'; });
  visibilityObserver.observe(document.querySelector('main'));
  updateCameraTarget();
  requestAnimationFrame(() => renderCamera());
})();
