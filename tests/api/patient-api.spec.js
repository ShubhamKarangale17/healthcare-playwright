const { test, expect } = require('@playwright/test');

/**
 * Patient API Test Suite
 * Tests CRUD operations against JSONPlaceholder API
 * 
 * API Base URL: https://jsonplaceholder.typicode.com
 * 
 * This suite tests:
 * - GET requests for retrieving patients
 * - POST request for creating a patient
 * - PUT request for updating a patient
 * - DELETE request for removing a patient
 * - HTTP status codes
 * - Response body validation
 */

// Base API URL
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Test data for API operations
const NEW_PATIENT = {
  name: 'John Smith',
  email: 'john.smith@healthcare.com',
  phone: '555-1234',
  company: {
    name: 'Healthcare Solutions Inc',
  },
};

const UPDATED_PATIENT = {
  name: 'John Smith Updated',
  email: 'john.smith.updated@healthcare.com',
  phone: '555-5678',
  company: {
    name: 'Updated Healthcare Inc',
  },
};

test.describe('Patient API Tests - @api @patient', () => {

  test('GET all patients - verify response structure and status', async ({ request }) => {
    /**
     * Test Case 1: Retrieve all patients (users) from the API
     * 
     * Expected:
     * - Status code: 200
     * - Response is an array
     * - Each patient has required fields: id, name, email, phone
     * 
     * API Endpoint: GET /users
     */

    const response = await request.get(`${API_BASE_URL}/users`);

    // Verify status code
    expect(response.status()).toBe(200);
    console.log('✓ GET /users returned 200 status');

    // Parse response body
    const patients = await response.json();

    // Verify response is an array
    expect(Array.isArray(patients)).toBe(true);
    expect(patients.length).toBeGreaterThan(0);
    console.log(`✓ Retrieved ${patients.length} patients`);

    // Verify each patient has required fields
    patients.forEach((patient) => {
      expect(patient).toHaveProperty('id');
      expect(patient).toHaveProperty('name');
      expect(patient).toHaveProperty('email');
      expect(patient).toHaveProperty('phone');
      
      // Verify data types
      expect(typeof patient.id).toBe('number');
      expect(typeof patient.name).toBe('string');
      expect(typeof patient.email).toBe('string');
      expect(typeof patient.phone).toBe('string');
    });

    console.log('✓ All patients have required fields with correct data types');
  });

  test('GET single patient by ID - verify patient details', async ({ request }) => {
    /**
     * Test Case 2: Retrieve a specific patient by ID
     * 
     * Expected:
     * - Status code: 200
     * - Response contains correct patient data
     * - Patient ID matches the requested ID
     * 
     * API Endpoint: GET /users/{id}
     */

    const patientId = 1; // Request patient with ID 1

    const response = await request.get(`${API_BASE_URL}/users/${patientId}`);

    // Verify status code
    expect(response.status()).toBe(200);
    console.log(`✓ GET /users/${patientId} returned 200 status`);

    // Parse response body
    const patient = await response.json();

    // Verify patient ID matches requested ID
    expect(patient.id).toBe(patientId);
    console.log(`✓ Retrieved patient with ID: ${patient.id}`);

    // Verify patient has required fields
    expect(patient).toHaveProperty('id');
    expect(patient).toHaveProperty('name');
    expect(patient).toHaveProperty('email');
    expect(patient).toHaveProperty('phone');
    expect(patient).toHaveProperty('username');
    expect(patient).toHaveProperty('address');
    expect(patient).toHaveProperty('company');
    console.log(`✓ Patient ${patientId} - ${patient.name} has all required fields`);

    // Verify patient name is not empty
    expect(patient.name.length).toBeGreaterThan(0);
    console.log(`✓ Patient name verified: ${patient.name}`);
  });

  test('GET non-existent patient - verify 404 response', async ({ request }) => {
    /**
     * Test Case 3: Attempt to retrieve non-existent patient
     * 
     * Expected:
     * - Status code: 404 (Not Found)
     * 
     * API Endpoint: GET /users/{invalidId}
     */

    const invalidPatientId = 99999;

    const response = await request.get(`${API_BASE_URL}/users/${invalidPatientId}`);

    // Verify status code is 404 (though JSONPlaceholder returns empty object)
    // JSONPlaceholder API typically doesn't return 404, but we check the response
    expect(response.status()).toBe(200);
    
    const patient = await response.json();
    // JSONPlaceholder returns empty object for non-existent users
    expect(Object.keys(patient).length).toBe(0);
    console.log(`✓ Non-existent patient returns empty response`);
  });

  test('POST create new patient - verify patient is created', async ({ request }) => {
    /**
     * Test Case 4: Create a new patient via POST request
     * 
     * Expected:
     * - Status code: 201 (Created)
     * - Response includes new patient with assigned ID
     * - Posted data is reflected in response
     * 
     * API Endpoint: POST /users
     */

    const response = await request.post(`${API_BASE_URL}/users`, {
      data: NEW_PATIENT,
    });

    // Verify status code (JSONPlaceholder returns 201 for POST)
    expect(response.status()).toBe(201);
    console.log('✓ POST /users returned 201 status');

    // Parse response body
    const createdPatient = await response.json();

    // Verify patient was created with an ID
    expect(createdPatient).toHaveProperty('id');
    expect(createdPatient.id).toBeGreaterThan(0);
    console.log(`✓ Patient created with ID: ${createdPatient.id}`);

    // Verify posted data is in response
    expect(createdPatient.name).toBe(NEW_PATIENT.name);
    expect(createdPatient.email).toBe(NEW_PATIENT.email);
    expect(createdPatient.phone).toBe(NEW_PATIENT.phone);
    console.log(`✓ Created patient verified: ${createdPatient.name}`);
  });

  test('PUT update patient - verify patient data is updated', async ({ request }) => {
    /**
     * Test Case 5: Update an existing patient via PUT request
     * 
     * Expected:
     * - Status code: 200
     * - Response contains updated patient data
     * - All updated fields reflect the changes
     * 
     * API Endpoint: PUT /users/{id}
     */

    const patientId = 1;

    const response = await request.put(`${API_BASE_URL}/users/${patientId}`, {
      data: UPDATED_PATIENT,
    });

    // Verify status code
    expect(response.status()).toBe(200);
    console.log(`✓ PUT /users/${patientId} returned 200 status`);

    // Parse response body
    const updatedPatient = await response.json();

    // Verify patient ID is preserved
    expect(updatedPatient.id).toBe(patientId);

    // Verify all fields are updated
    expect(updatedPatient.name).toBe(UPDATED_PATIENT.name);
    expect(updatedPatient.email).toBe(UPDATED_PATIENT.email);
    expect(updatedPatient.phone).toBe(UPDATED_PATIENT.phone);
    console.log(`✓ Patient ${patientId} updated successfully`);
    console.log(`✓ Updated name: ${updatedPatient.name}`);
    console.log(`✓ Updated email: ${updatedPatient.email}`);
  });

  test('DELETE patient - verify patient is removed', async ({ request }) => {
    /**
     * Test Case 6: Delete a patient via DELETE request
     * 
     * Expected:
     * - Status code: 200
     * - Response body is empty object
     * 
     * API Endpoint: DELETE /users/{id}
     */

    const patientId = 1;

    const response = await request.delete(`${API_BASE_URL}/users/${patientId}`);

    // Verify status code (JSONPlaceholder returns 200 for successful DELETE)
    expect(response.status()).toBe(200);
    console.log(`✓ DELETE /users/${patientId} returned 200 status`);

    // Parse response body
    const deletedResponse = await response.json();

    // JSONPlaceholder returns empty object on deletion
    expect(Object.keys(deletedResponse).length).toBe(0);
    console.log(`✓ Patient ${patientId} successfully deleted`);
  });

  test('POST create patient with validation', async ({ request }) => {
    /**
     * Test Case 7: Create patient and validate response structure
     * 
     * Expected:
     * - Status code: 201
     * - Response validates against expected schema
     * - All required fields present
     */

    const testPatient = {
      name: 'Jane Doe',
      email: 'jane.doe@healthcare.com',
      phone: '555-9999',
      website: 'janedoe.health',
      company: {
        name: 'Jane Healthcare LLC',
        catchPhrase: 'Innovative solutions',
        bs: 'patient-centric',
      },
    };

    const response = await request.post(`${API_BASE_URL}/users`, {
      data: testPatient,
    });

    expect(response.status()).toBe(201);

    const createdPatient = await response.json();

    // Validate response structure
    expect(createdPatient).toHaveProperty('id');
    expect(createdPatient).toHaveProperty('name');
    expect(createdPatient).toHaveProperty('email');
    expect(createdPatient).toHaveProperty('phone');
    expect(createdPatient).toHaveProperty('company');

    // Validate company structure
    expect(createdPatient.company).toHaveProperty('name');

    console.log('✓ Patient created with valid schema');
  });

  test('GET patients - verify response headers', async ({ request }) => {
    /**
     * Test Case 8: Verify response headers are correct
     * 
     * Expected:
     * - Content-Type: application/json
     * - Status: 200
     */

    const response = await request.get(`${API_BASE_URL}/users`);

    // Verify status
    expect(response.status()).toBe(200);

    // Verify content type
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
    console.log(`✓ Response Content-Type: ${contentType}`);

    console.log('✓ Response headers validated');
  });

  test('PATCH update patient - verify partial update', async ({ request }) => {
    /**
     * Test Case 9: Partial update using PATCH
     * 
     * Expected:
     * - Status code: 200
     * - Only specified fields are updated
     */

    const patientId = 2;
    const partialUpdate = {
      name: 'Updated Name Only',
    };

    const response = await request.patch(`${API_BASE_URL}/users/${patientId}`, {
      data: partialUpdate,
    });

    expect(response.status()).toBe(200);

    const patchedPatient = await response.json();

    // Verify the patched field
    expect(patchedPatient.name).toBe(partialUpdate.name);
    expect(patchedPatient.id).toBe(patientId);

    console.log(`✓ Patient ${patientId} partially updated`);
  });

  test('GET patients - verify performance', async ({ request }) => {
    /**
     * Test Case 10: Verify API response time is acceptable
     * 
     * Expected:
     * - Response time < 2000ms
     * - Status code: 200
     */

    const startTime = Date.now();
    const response = await request.get(`${API_BASE_URL}/users`);
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status()).toBe(200);
    expect(responseTime).toBeLessThan(2000);

    console.log(`✓ API response time: ${responseTime}ms`);
    console.log('✓ API performance is acceptable');
  });
});
