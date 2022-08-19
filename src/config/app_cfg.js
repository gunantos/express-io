const express = require('express');
const cors = require('cors');

const app_cfg = {
    express: express(),
    cors: cors(),
    parameter: express.json()
}
module.exports = app_cfg