'use strict';

var CLOUD_X = 100; // Верхний левый угол облака для текста, координата X
var CLOUD_Y = 10; // Верхний левый угол облака для текста, координата Y
var CLOUD_WIDTH = 420; // Ширина облака
var CLOUD_HEIGHT = 270; // Высота облака
var GAP = 10;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT = 'PT Mono';
var FONT_SIZE = 16;
var FONT_UNIT = 'px';
var COLUMN_GAP = 50;
var COLUMN_WIDTH = 40;


var drawCloud = function (ctx, cloudCoordX, cloudCoordY, cloudWidth, cloudHeight, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudCoordX, cloudCoordY, cloudWidth, cloudHeight);
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.font = FONT_SIZE + FONT_UNIT + ' ' + FONT;
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP + FONT_SIZE);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + 2 * (GAP + FONT_SIZE));
  ctx.textAlign = 'left';
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], CLOUD_X + GAP / 2 + (i + 1) * COLUMN_GAP + i * COLUMN_WIDTH, CLOUD_Y + CLOUD_HEIGHT - GAP);
  }
};
