const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../../models');

router.post('/project-details', (req, res) => {
  const { project_name, client, poc, description, start_date, end_date } = req.body;
  const project_id = uuidv4();
  const project_details = {
    project_id,
    project_name,
    client,
    poc,
    description,
    start_date,
    end_date
  };
  db.project_details.create(project_details)
    .then((data) => {
      res.status(201).json(data);
    }
    )
    .catch((err) => {
      res.status(400).json(err);
    }
    );
});

router.get('/project-details', (req, res) => {
  db.project_details.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post('/project-events', (req, res) => {
  const {
    event_name,
    start_date,
    end_date } = req.body;
  const project_id = req.body.project_id;
  const event_id = uuidv4();
  const project_events = {
    project_id,
    event_id,
    event_name,
    start_date,
    end_date
  };

  db.project_events.create(project_events)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});



router.get('/project-events', (req, res) => {
  db.project_events.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// get project details and events
router.get('/project-details-events', (req, res) => {
  // get project name, event name, start date, end date
  db.project_details.findAll({
    attributes: ['project_name', 'start_date', 'end_date'],
    include: [{
      model: db.project_events,
      attributes: ['event_name', 'start_date', 'end_date']
    }]
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// delete project details and events
router.delete('/project-details-events/:id', (req, res) => {
  const project_id = req.params.id;
  db.project_details.destroy({
    where: {
      project_id
    }
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

    
module.exports = router;