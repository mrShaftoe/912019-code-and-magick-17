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
  var columnOpacity = (name === 'Вы') ? 1 : Math.random() * (0.9 - 0.1) + 0.1;
  return 'rgba(' + COLUMN_COLOR + columnOpacity + ')';
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


  ctx.textAlign = 'left';

  for (var i = 0; i < names.length; i++) {
    var score = Math.floor(times[i]); // Получение целой части времени игры для текущего игрока

    var columnX = CLOUD_X + cloudPadding + i * (COLUMN_WIDTH + COLUMN_GAP); // Получение координаты X для колонки текущего игрока

    var nameY = CLOUD_Y + CLOUD_HEIGHT - GAP; // Получение координаты Y для имени текущего игрока

    var columnBottom = nameY - GAP - FONT_SIZE; // Получение координаты Y нижнего края колонки-гистограммы для текущего игрока
    var columnHeight = Math.floor(score * columnHeightCoefficient); // Получение высоты колонки-гистограммы для текущего игрока
    var columnTop = columnBottom - columnHeight; // Получение координаты Y верхнего края колонки-гистограммы для текущего игрока

    var scoreBottom = columnTop - GAP; // Получение координаты Y для времени текущего игрока

    ctx.fillStyle = FONT_COLOR; // Задание цвета текста
    ctx.fillText(score, columnX, scoreBottom); // Отрисовка счёта текущего игрока
    ctx.fillText(names[i], columnX, nameY); // Отрисовка имени текущего игрока

    ctx.fillStyle = getColumnColor(names[i]); // Задание цвета колонки-гистограммы текущего игрока
    ctx.fillRect(columnX, columnTop, COLUMN_WIDTH, columnHeight); // Отрисовка колонки-гистограммы для текущего игрока
  }
};

/**
 * Функция, запускающая функции отрисовки
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
