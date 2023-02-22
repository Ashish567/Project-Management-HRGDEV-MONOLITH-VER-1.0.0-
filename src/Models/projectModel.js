const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      unique: true,
      required: [true, 'Please provide the project name!']
    },
    projectDesc: {
      type: String,
      required: [true, 'Please provide the project description!']
    },
    projectStatus: {
      type: String,
      enum: ['progress', 'pending', 'done'],
      default: 'pending'
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'Tasks must belong to a project.']
      }
    ]
  },
  { timestamps: true }
);

projectSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tasks',
    select: 'taskName taskDesc taskStatus',
    strictPopulate: false
  });
  next();
});
projectSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Project', projectSchema);
