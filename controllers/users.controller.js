// get resource model (definition and DB operations)
const user = require('../models/users.model.js');
// EXPORT function to display list of all tutorials (required by ROUTER)
exports.findAll = (req, res) => {
user.getAll( (err, data) => {
if (err) // send error response
res.status(500).send({
message: err.message || "Some error occurred while retrieving tutorials."
});
else
res.status(200).json(data); // send OK response with all tutorials data
});
};