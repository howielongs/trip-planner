const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// Database connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'bblbehavior',
    database: 'trip_planner',
    port: 3306
});

//route to get all itineraries
router.get('/:user_id/itineraries', (req, res) => {
    const {user_id} = req.params; 

    if(!user_id){
        return res.status(400).json({ error: 'No user information provided' });

    }
    connection.query(
        'SELECT * FROM itinerary WHERE user_id = ?',
        [user_id],
        (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Database error while checking user' });
            }
            res.json(results);
        }); 
});

// Route to get all suggestions
router.get('/suggestions', (req, res) => {
    connection.query('SELECT * FROM suggestions', (err, results) => {
        if (err) {
            console.error('Error fetching suggestions:', err);
            return res.status(500).json({ error: 'Failed to fetch suggestions' });
        }
        res.json(results);
        console.log(results);
    });
});

//route to get activities
router.get('/:user_id/:itinerary_id/activities', (req, res) => {
    const {user_id, itinerary_id } = req.params; 

    if(!user_id || !itinerary_id){
        return res.status(400).json({ error: 'User_id and itinerary_id are required' });

    }
    connection.query(
        'SELECT * FROM activity WHERE itinerary_id = ?',
        [user_id, itinerary_id],
        (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Database error while checking activities' });
            }
            res.json(results);
            console.log(results);
        }
    );});

// Route to add or find user
router.post('/user', (req, res) => {
    const { user_name, email } = req.body;

    if (!email || !user_name) {
        return res.status(400).json({ error: 'User name and email are required' });
    }

    connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Database error while checking user' });
            }

            if (results.length > 0) {
                res.json({ message: 'User found', user: results[0] });
            } else {
                connection.query(
                    'INSERT INTO user (user_name, email) VALUES (?, ?)',
                    [user_name, email],
                    (err, result) => {
                        if (err) {
                            console.error('Error adding user:', err);
                            return res.status(500).json({ error: 'Database error while adding user' });
                        }

                        res.json({
                            message: 'User added successfully',
                            user: { user_id: result.insertId, user_name, email },
                        });
                    }
                );
            }
        }
    );
});

//Route to add itinerary list 
router.post('/itinerary', (req, res) => {
    const { user_id, itinerary_name, start_date, end_date, created_date, activity_count } = req.body;

    if (!user_id || !itinerary_name || !start_date || !end_date || !created_date  || !activity_count) {
        return res.status(400).json({ error: 'something in the payload is missing:(' });
    }

    connection.query(
        'SELECT * FROM itinerary WHERE user_id = ?  && itinerary_name = ?',
        [user_id, itinerary_name],
        (err, results) => {
            if (err) {
                console.error('Error checking itinerary:', err);
                return res.status(500).json({ error: 'Database error while checking itinerary' });
            }

            if (results.length > 0) {
                res.json({ message: 'Itinerary cannot have duplicate names', user: results[0] });
            } else {
                connection.query(
                    'INSERT INTO itinerary (user_id, itinerary_name, start_date, end_date, created_date) VALUES (?, ?, ?, ?, ? )',
                    [user_id, itinerary_name, start_date, end_date, created_date, activity_count],
                    (err, result) => {
                        if (err) {
                            console.error('Error adding user:', err);
                            return res.status(500).json({ error: 'Database error while adding intinerary' });
                        }

                        res.json({
                            message: 'internary added successfully',
                            itinerary: { itinerary_id: result.insertId,user_id, itinerary_name, start_date, end_date, created_date, activity_count},
                        });
                    }
                );
            }
        }
    );
});

//route to add activity
router.post('/:user_id/:itinerary_id/activity', (req, res) => {
    const {user_id, itinerary_id } = req.params; 
    const {lon, lat, activity_name, start_date,  address, activity_id} = req.body;

    if (!user_id){
        return res.status(400).json({ error: 'user_id missing' });
    }
    if (!itinerary_id){
        return res.status(400).json({ error: 'itinerary_id missing' });
    }
    if (!activity_name){
        return res.status(400).json({ error: 'activity_name missing' });
    }
    if (!start_date ){
        return res.status(400).json({ error: 'start_date  missing' });
    }
    if (!lon){
        return res.status(400).json({ error: 'lon missing' });
    }
    if (!lat){
        return res.status(400).json({ error: 'lat missing' });
    }
    if (!address){
        return res.status(400).json({ error: 'address missing' });
    }
    if (!activity_id){
        return res.status(400).json({ error: 'activity_id missing' });
    }

    connection.query(
        'SELECT * FROM activity WHERE itinerary_id = ?  && activity_id = ? ',
        [itinerary_id, activity_id],
        (err, results) => {
            if (err) {
                console.error('Error checking activity:', err);
                return res.status(500).json({ error: 'Database error while checking activity' });
            }

            if (results.length > 0) {
                res.json({ message: 'activity already at this row', user: results[0] });
            } else {
                connection.query(
                    'INSERT INTO activity (itinerary_id, activity_name, start_date,  lon, lat, address, activity_id) VALUES (?, ?, ?, ?, ?, ?, ? )',
                    [itinerary_id, activity_name, start_date,  lon, lat, address, activity_id],
                    (err, result) => {
                        if (err) {
                            console.error('Error adding activity:', err);
                            return res.status(500).json({ error: 'Database error while adding activity' });
                        }

                        res.json({
                            message: 'activity added successfully',
                            activity: { itinerary_id, activity_id, activity_name, address, start_date,  lon, lat},
                        });
                    }
                );
            }
        }
    );
});

//delete activity
router.delete('/:user_id/:itinerary_id/activity/:activity_id', (req, res) => {
    const {user_id, itinerary_id, activity_id } = req.params; 

    connection.query(
        'DELETE FROM activity WHERE itinerary_id = ?  && activity_id = ? ',
        [itinerary_id, activity_id],
        (err, results) => {
            if (err) {
                console.error('Error checking activity:', err);
                return res.status(500).json({ error: 'Database error while checking activity' });
            } else {
                res.json({
                    message: 'activity deleted successfully',
                    activity_id:{activity_id}
                })
            }
        }
    );
});

//update itinerary details
router.put(':user_id/itinerary/:itinerary_id', (req, res) => {
    const { user_id, itinerary_id } = req.params; // Extract user_id and itinerary_id from URL params
    const { itinerary_name, start_date, end_date, created_date, activity_count } = req.body; // Extract fields to update
  
    if (!user_id || !itinerary_id) {
      return res.status(400).json({ error: 'User ID and Itinerary ID are required' });
    }
  
    // Build the query dynamically to allow partial updates
    let query = 'UPDATE itinerary SET ';
    const fields = [];
    const values = [];
  
    if (itinerary_name) {
      fields.push('itinerary_name = ?');
      values.push(itinerary_name);
    }
    if (start_date) {
      fields.push('start_date = ?');
      values.push(start_date);
    }
    if (end_date) {
      fields.push('end_date = ?');
      values.push(end_date);
    }
    if (created_date) {
      fields.push('created_date = ?');
      values.push(created_date);
    }
    if (activity_count !== undefined) {
      fields.push('activity_count = ?');
      values.push(activity_count);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
  
    // Complete the query and add WHERE condition
    query += fields.join(', ') + ' WHERE user_id = ? AND itinerary_id = ?';
    values.push(user_id, itinerary_id);
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating itinerary:', err);
        return res.status(500).json({ error: 'Database error while updating itinerary' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Itinerary not found for the given user' });
      }
  
      res.json({ message: 'Itinerary updated successfully' });
    });
  });

module.exports = router;
