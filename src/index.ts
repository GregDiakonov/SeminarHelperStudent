import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker,
} from '@jupyterlab/notebook'

import StudentInterface from './student';

/**
 * Initialization data for the SeminarHelperStudent extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'SeminarHelperStudent:plugin',
  description: 'A student-side app for supporting Seminar Helper online coding classes support system.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension SeminarHelperStudent is activated!');

    tracker.widgetAdded.connect((sender, notebookPanel) => {
      const widget = new StudentInterface();

      document.body.appendChild(widget.node);

      console.log("Student Interface rendered!")
    })
  }
};

export default plugin;
