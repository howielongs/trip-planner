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


// Route to fetch all suggestions
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


router.get('/activities', (req, res) => {
    const {user_id, itenerary_day } = req.body; 

    if(!user_id || !itenerary_day){
        return res.status(400).json({ error: 'User name and email are required' });

    }
    connection.query(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id],
        (err, results) => {
            if (err) {
                console.error('Error checking user:', err);
                return res.status(500).json({ error: 'Database error while checking user' });
            }

            if (results.length > 0) {
                res.json({ message: 'activities found', user: results[0] });
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
    const { user_id, itinerary_name, start_date, end_date, created_date, trip_length } = req.body;

    if (!user_id || !itinerary_name || !start_date || !end_date || !created_date  || !trip_length) {
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
                    [user_id, itinerary_name, start_date, end_date, created_date, trip_length],
                    (err, result) => {
                        if (err) {
                            console.error('Error adding user:', err);
                            return res.status(500).json({ error: 'Database error while adding intinerary' });
                        }

                        res.json({
                            message: 'internary added successfully',
                            itinerary: { itinerary_id: result.insertId,user_id, itinerary_name, start_date, end_date, created_date, trip_length},
                        });
                    }
                );
            }
        }
    );
});

router.put(':user_id/itinerary//:itinerary_id', (req, res) => {
    const { user_id, itinerary_id } = req.params; // Extract user_id and itinerary_id from URL params
    const { itinerary_name, start_date, end_date, created_date, trip_length } = req.body; // Extract fields to update
  
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
    if (trip_length !== undefined) {
      fields.push('trip_length = ?');
      values.push(trip_length);
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
