'use strict';

var CLOUD_X = 100; // Верхний левый угол облака для сообщения, координата X
var CLOUD_Y = 10; // Верхний левый угол облака для сообщения, координата Y
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGHT = 270; // Высота облака
var GAP = 10; // Межстрочный интервал
var CLOUD_COLOR = '#ffffff'; // Цвет облака сообщения
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; // Цвет тени облака сообщения
var CLOUD_HEADER_TEXT = ['Ура вы победили!', 'Список результатов:'];
var FONT = 'PT Mono'; // Шрифт
var FONT_SIZE = 16; // Размер шрифта
var FONT_UNIT = 'px'; // Единица измерения шрифта
var FONT_COLOR = 'rgba(0, 0, 0, 1)'; // Цвет шрифта
var COLUMN_GAP = 50; // Расстояние между колонками
var COLUMN_WIDTH = 40; // Ширина колонки
var COLUMN_MAX_HEIGHT = 150; // Максимальная высота колонки
var PLAYER_COLUMN_COLOR = '255, 0, 0, '; // Цвет колонки последнего игрока
var COLUMN_COLOR = '0, 0, 255, '; // Цвет для колонки результата, rgb

/**
 * Функция отрисовки облака сообщения
 * @param {object} ctx контекст рисования
 * @param {number} x координата X верхнего левого угла облака сообщения
 * @param {number} y координата Y верхнего левого угла облака сообщения
 * @param {string} color Цвет заливки облака сообщения
*/
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color; // Задание фона облака
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // Отрисовка облака сообщения
};

/**
 * Функция отрисовки шапки статистики
 * @param {object} ctx контекст рисования
 * @param {object} arr список строк для вывода
*/
var renderCloudHeader = function (ctx, arr) {
  ctx.fillStyle = FONT_COLOR;
  ctx.font = FONT_SIZE + FONT_UNIT + ' ' + FONT;
  ctx.textAlign = 'center';

  for (var i = 0; i < arr.length; i++) {
    ctx.fillText(arr[i], CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + (i + 1) * (GAP + FONT_SIZE));
  }
};

/**
 * Функция получения максимального времени игры
 * @param {object} arr список результатов игры
 * @return {number} целая часть максимального результата игры
*/
var getMaxTime = function (arr) {
  return Math.floor(Math.max.apply(null, arr));
};

/**
 * Функция получения цвета колонки
 * @param {string} name имя игрока
 * @return {string} цвет колонки в формате rgba
*/
var getColumnColor = function (name) {
  var opacity;
  var color;
  if (name === 'Вы') {
    opacity = 1;
    color = PLAYER_COLUMN_COLOR;
  } else {
    opacity = (Math.random() * 0.9 + 0.1).toFixed(2);
    color = COLUMN_COLOR;
  }

  return 'rgba(' + color + opacity + ')';
};

/**
 * Функция отрисовки имени и времени игроков, гистограммы в соответствии с временем
 * @param {object} ctx контекст рисования
 * @param {object} names список имен игроков
 * @param {object} times список времени игроков
*/
var renderResults = function (ctx, names, times) {
  var cloudPadding = (CLOUD_WIDTH - names.length * COLUMN_WIDTH - (names.length - 1) * COLUMN_GAP) / 2; // Расчёт отступа для центровки статистики в облаке
  var columnHeightCoefficient = COLUMN_MAX_HEIGHT / getMaxTime(times); // Получение коэффициента для расчёт высоты колонок (отношение максимального времени игры к максимальной высоте колонки)
  var columnBottom = CLOUD_Y + CLOUD_HEIGHT - 2 * GAP - FONT_SIZE; // Получение координаты Y нижнего края колонки-гистограммы для текущего игрока
  var columnTop;

  ctx.textAlign = 'left';

  for (var i = 0; i < names.length; i++) {
    columnTop = columnBottom - Math.floor(Math.floor(times[i]) * columnHeightCoefficient); // Получение координаты Y верхнего края колонки-гистограммы для текущего игрока

    ctx.fillStyle = FONT_COLOR; // Задание цвета текста
    ctx.fillText(Math.floor(times[i]), CLOUD_X + cloudPadding + i * (COLUMN_WIDTH + COLUMN_GAP), columnTop - GAP); // Отрисовка счёта текущего игрока
    ctx.fillText(names[i], CLOUD_X + cloudPadding + i * (COLUMN_WIDTH + COLUMN_GAP), CLOUD_Y + CLOUD_HEIGHT - GAP); // Отрисовка имени текущего игрока
    ctx.fillStyle = getColumnColor(names[i]); // Задание цвета колонки-гистограммы текущего игрока
    ctx.fillRect(CLOUD_X + cloudPadding + i * (COLUMN_WIDTH + COLUMN_GAP), columnTop, COLUMN_WIDTH, columnBottom - columnTop); // Отрисовка колонки-гистограммы для текущего игрока
  }
};

/**
 * Функция, запускающая необходимые функции отрисовки
 * @param {object} ctx контекст рисования
 * @param {object} names список имен игроков
 * @param {object} times список времени игроков
*/
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR); // Отрисовка тени облака сообщения
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR); // Отрисовка облака сообщения
  renderCloudHeader(ctx, CLOUD_HEADER_TEXT); // Отрисовка шапки облака сообщения
  renderResults(ctx, names, times); // Отрисовка результатов
};
