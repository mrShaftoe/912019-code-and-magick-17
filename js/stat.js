'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GAP = 10;
var CLOUD_COLOR = '#ffffff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FONT_SIZE = 16;

var drawCloud = function (ctx, cloudCoordX, cloudCoordY, cloudWidth, cloudHeight, cloudColor) {
  ctx.fillStyle = cloudColor;
  ctx.fillRect(cloudCoordX, cloudCoordY, cloudWidth, cloudHeight);
};

window.renderStatistics = function (ctx, names, times) {
  drawCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);

  ctx.fillStyle = '#000';
  ctx.textAlign = 'center';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Hello world', CLOUD_X + CLOUD_WIDTH / 2, CLOUD_Y + GAP + FONT_SIZE);
};
