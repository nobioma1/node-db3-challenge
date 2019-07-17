const db = require('./dbConfig');

module.exports = { find, add, findById, remove, update, findSteps, addStep };

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes')
    .where({ id })
    .first();
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(([id]) => findById(id));
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
    .then(() => findById(id));
}

function findSteps(id) {
  return db('schemes')
    .select(['steps.id', 'scheme_name', 'step_number', 'instructions'])
    .join('steps', 'schemes.id', 'steps.scheme_id')
    .where({ scheme_id: id });
}

function addStep(stepData, scheme_id) {
  return db('steps')
    .insert({ ...stepData, scheme_id })
    .then(() => findSteps(scheme_id));
}
