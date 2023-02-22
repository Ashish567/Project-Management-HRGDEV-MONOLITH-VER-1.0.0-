const mongoose = require('mongoose');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const taskSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Task must belong to a project.']
    },
    taskName: {
      type: String,
      unique: true,
      required: [true, 'Please provide the task name!']
    },
    taskDesc: {
      type: String,
      required: [true, 'Please provide the task description!']
    },
    taskStatus: {
      type: String,
      enum: ['progress', 'pending', 'done'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

taskSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'projectId',
    select: 'projectName projectDesc projectStatus',
    strictPopulate: false
  });
  next();
});
taskSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Task', taskSchema);
