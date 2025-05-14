<!-- # Quotation System API Documentation

<div align="center">

![alt text](https://github.com/CrajeX/Fire-Ticket-Cj/tree/main/fire-protection-quotation/drop.jpg?raw=true)

*A comprehensive REST API for managing service quotations and customer relations*

[![API Status](https://img.shields.io/badge/status-stable-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Documentation](https://img.shields.io/badge/docs-complete-green)]()

</div>

## 📋 Contents

- [Overview](#overview)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
  - [Service Endpoints](#service-endpoints)
  - [QuotationItem Endpoints](#quotationitem-endpoints)
  - [Quotation Endpoints](#quotation-endpoints)
  - [Customer Endpoints](#customer-endpoints)
- [Example Requests & Responses](#example-requests--responses)
  - [Service Examples](#service-examples)
  - [QuotationItem Examples](#quotationitem-examples)
  - [Quotation Examples](#quotation-examples)
  - [Customer Examples](#customer-examples)
- [Response Structure](#response-structure)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)

## Overview

This API provides a complete solution for creating and managing quotations for services. It allows for tracking customers, services, and detailed quotation items with various operations.

## Data Model

The system consists of the following main entities:

- **Customer**: Contains client information
- **Service**: Represents available services with pricing
- **Quotation**: Main document that groups items for a customer
- **QuotationItem**: Individual line items in a quotation
- **Media**: Attachments and supporting files

Relationship diagram:
- A Customer can have many Quotations
- A Quotation contains many QuotationItems
- A Quotation can have many Media attachments
- A QuotationItem belongs to a Service and a Quotation
- A Service can be referenced in many QuotationItems

## API Endpoints

### Service Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| GET | `/api/services/:id` | Get a specific service |
| POST | `/api/services` | Create a new service |
| PUT | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |

### QuotationItem Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotation-items` | List all quotation items |
| GET | `/api/quotation-items/:id` | Get a specific quotation item |
| POST | `/api/quotation-items` | Create a new quotation item |
| PUT | `/api/quotation-items/:id` | Update a quotation item |
| DELETE | `/api/quotation-items/:id` | Delete a quotation item |

### Quotation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotations` | List all quotations |
| GET | `/api/quotations/:id` | Get a specific quotation |
| POST | `/api/quotations` | Create a new quotation |
| PUT | `/api/quotations/:id` | Update a quotation |
| DELETE | `/api/quotations/:id` | Delete a quotation |
| GET | `/api/quotations/:id/calculate-total` | Calculate and update quotation total |

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get a specific customer |
| POST | `/api/customers` | Create a new customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

## Example Requests & Responses

### Service Examples

#### GET /api/services

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Website Development",
        "description": "Full-stack website development with responsive design",
        "basePrice": 2500,
        "category": "development",
        "estimatedHours": 40,
        "specifications": "## Project Specifications\n- Custom designs\n- Mobile responsive\n- SEO optimization\n- Content management system\n- Contact form",
        "createdAt": "2025-03-15T09:30:00.000Z",
        "updatedAt": "2025-03-15T09:30:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "Logo Design",
        "description": "Professional logo design with brand guidelines",
        "basePrice": 800,
        "category": "design",
        "estimatedHours": 12,
        "specifications": "## Design Deliverables\n- 3 initial concepts\n- 2 revision rounds\n- Final files in vector format\n- Brand usage guidelines",
        "createdAt": "2025-03-15T10:00:00.000Z",
        "updatedAt": "2025-03-15T10:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/services/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Website Development",
      "description": "Full-stack website development with responsive design",
      "basePrice": 2500,
      "category": "development",
      "estimatedHours": 40,
      "specifications": "## Project Specifications\n- Custom designs\n- Mobile responsive\n- SEO optimization\n- Content management system\n- Contact form",
      "createdAt": "2025-03-15T09:30:00.000Z",
      "updatedAt": "2025-03-15T09:30:00.000Z",
      "quotation_items": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "quantity": 1,
              "unitPrice": 2500,
              "discount": 10,
              "total": 2250
            }
          }
        ]
      }
    }
  }
}
```
</details>

#### POST /api/services

<details>
<summary>Request</summary>

```json
{
  "data": {
    "name": "SEO Optimization",
    "description": "Improve your website's search engine rankings",
    "basePrice": 1200,
    "category": "marketing",
    "estimatedHours": 20,
    "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1200,
      "category": "marketing",
      "estimatedHours": 20,
      "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting",
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T14:30:00.000Z"
    }
  }
}
```
</details>

#### PUT /api/services/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "basePrice": 1500,
    "estimatedHours": 25
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1500,
      "category": "marketing",
      "estimatedHours": 25,
      "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting",
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T15:45:00.000Z"
    }
  }
}
```
</details>

#### DELETE /api/services/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Service deleted",
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1500,
      "category": "marketing",
      "estimatedHours": 25,
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T15:45:00.000Z"
    }
  }
}
```
</details>

### QuotationItem Examples

#### GET /api/quotation-items

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "quantity": 1,
        "unitPrice": 2500,
        "discount": 10,
        "total": 2250,
        "notes": "Includes 5 pages and basic CMS setup",
        "createdAt": "2025-04-01T11:20:00.000Z",
        "updatedAt": "2025-04-01T11:20:00.000Z",
        "quotation": {
          "data": {
            "id": 1
          }
        },
        "service": {
          "data": {
            "id": 1
          }
        }
      }
    },
    {
      "id": 2,
      "attributes": {
        "quantity": 1,
        "unitPrice": 800,
        "discount": 0,
        "total": 800,
        "notes": "Brand package with all necessary files",
        "createdAt": "2025-04-01T11:25:00.000Z",
        "updatedAt": "2025-04-01T11:25:00.000Z",
        "quotation": {
          "data": {
            "id": 1
          }
        },
        "service": {
          "data": {
            "id": 2
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/quotation-items/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "quantity": 1,
      "unitPrice": 2500,
      "discount": 10,
      "total": 2250,
      "notes": "Includes 5 pages and basic CMS setup",
      "createdAt": "2025-04-01T11:20:00.000Z",
      "updatedAt": "2025-04-01T11:20:00.000Z",
      "quotation": {
        "data": {
          "id": 1,
          "attributes": {
            "reference": "QUOT-2025-001",
            "totalAmount": 3050
          }
        }
      },
      "service": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Website Development",
            "basePrice": 2500
          }
        }
      }
    }
  }
}
```
</details>

#### POST /api/quotation-items

<details>
<summary>Request</summary>

```json
{
  "data": {
    "quantity": 2,
    "unitPrice": 1200,
    "discount": 15,
    "notes": "Two months of service with premium features",
    "quotation": 1,
    "service": 3
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 2,
      "unitPrice": 1200,
      "discount": 15,
      "total": 2040,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:10:00.000Z",
      "quotation": {
        "data": {
          "id": 1
        }
      },
      "service": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### PUT /api/quotation-items/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "quantity": 3,
    "discount": 20
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 3,
      "unitPrice": 1200,
      "discount": 20,
      "total": 2880,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:15:00.000Z",
      "quotation": {
        "data": {
          "id": 1
        }
      },
      "service": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### DELETE /api/quotation-items/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Quotation item deleted",
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 3,
      "unitPrice": 1200,
      "discount": 20,
      "total": 2880,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:15:00.000Z"
    }
  }
}
```
</details>

### Quotation Examples

#### GET /api/quotations

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "reference": "QUOT-2025-001",
        "date": "2025-04-01T00:00:00.000Z",
        "validUntil": "2025-05-01T00:00:00.000Z",
        "status": "approved",
        "totalAmount": 3050,
        "notes": "Project to be delivered within 6 weeks of approval",
        "createdAt": "2025-04-01T10:00:00.000Z",
        "updatedAt": "2025-04-03T14:20:00.000Z",
        "customer": {
          "data": {
            "id": 1
          }
        }
      }
    },
    {
      "id": 2,
      "attributes": {
        "reference": "QUOT-2025-002",
        "date": "2025-04-15T00:00:00.000Z",
        "validUntil": null,
        "status": "draft",
        "totalAmount": 1500,
        "notes": "Awaiting client feedback",
        "createdAt": "2025-04-15T09:00:00.000Z",
        "updatedAt": "2025-04-15T09:00:00.000Z",
        "customer": {
          "data": {
            "id": 2
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/quotations/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "reference": "QUOT-2025-001",
      "date": "2025-04-01T00:00:00.000Z",
      "validUntil": "2025-05-01T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 3050,
      "notes": "Project to be delivered within 6 weeks of approval",
      "createdAt": "2025-04-01T10:00:00.000Z",
      "updatedAt": "2025-04-03T14:20:00.000Z",
      "quotation_items": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "quantity": 1,
              "unitPrice": 2500,
              "discount": 10,
              "total": 2250,
              "notes": "Includes 5 pages and basic CMS setup",
              "service": {
                "data": {
                  "id": 1,
                  "attributes": {
                    "name": "Website Development"
                  }
                }
              }
            }
          },
          {
            "id": 2,
            "attributes": {
              "quantity": 1,
              "unitPrice": 800,
              "discount": 0,
              "total": 800,
              "notes": "Brand package with all necessary files",
              "service": {
                "data": {
                  "id": 2,
                  "attributes": {
                    "name": "Logo Design"
                  }
                }
              }
            }
          }
        ]
      },
      "customer": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Acme Corporation",
            "email": "contact@acmecorp.com"
          }
        }
      },
      "attachments": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "name": "quotation_detail.pdf",
              "url": "/uploads/quotation_detail_1234567890.pdf"
            }
          }
        ]
      }
    }
  }
}
```
</details>

#### POST /api/quotations

<details>
<summary>Request</summary>

```json
{
  "data": {
    "reference": "QUOT-2025-003",
    "date": "2025-05-14T00:00:00.000Z",
    "status": "draft",
    "notes": "Monthly retainer proposal",
    "customer": 3
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": null,
      "status": "draft",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z",
      "updatedAt": "2025-05-14T16:30:00.000Z",
      "customer": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### PUT /api/quotations/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "status": "approved"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": "2025-06-13T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z",
      "updatedAt": "2025-05-14T16:40:00.000Z",
      "customer": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### DELETE /api/quotations/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Quotation and all related items deleted",
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": "2025-06-13T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z", 
      "updatedAt": "2025-05-14T16:40:00.000Z"
    }
  }
}
```
</details>

#### GET /api/quotations/:id/calculate-total

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "reference": "QUOT-2025-001",
      "totalAmount": 3050,
      "updatedAt": "2025-05-14T16:45:00.000Z"
    }
  }
}
```
</details>

### Customer Examples

#### GET /api/customers

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Acme Corporation",
        "email": "contact@acmecorp.com",
        "phone": "555-123-4567",
        "address": "123 Business Ave, Suite 100, Metropolis, NY 10001",
        "createdAt": "2025-03-10T08:00:00.000Z",
        "updatedAt": "2025-03-10T08:00:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "TechStart Solutions",
        "email": "info@techstart.io",
        "phone": "555-987-6543",
        "address": "456 Innovation Blvd, San Francisco, CA 94107",
        "createdAt": "2025-03-15T10:30:00.000Z",
        "updatedAt": "2025-03-15T10:30:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/customers/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Acme Corporation",
      "email": "contact@acmecorp.com",
      "phone": "555-123-4567",
      "address": "123 Business Ave, Suite 100, Metropolis, NY 10001",
      "createdAt": "2025-03-10T08:00:00.000Z",
      "updatedAt": "2025-03-10T08:00:00.000Z"
    }
  }
}
```
</details>

#### POST /api/customers

<details>
<summary>Request</summary>

```json
{
  "data": {
    "name": "Global Innovations Inc",
    "email": "hello@globalinnovations.com",
    "phone": "555-888-9999",
    "address": "789 Enterprise Way, Chicago, IL 60601"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-9999",
      "address": "789 Enterprise Way, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:00:00.000Z"
    }
  }
}
```
</details>

#### PUT /api/customers/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "phone": "555-888-0000",
    "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-0000",
      "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:05:00.000Z"
    }
  }
}
```
</details>

#### DELETE /api/customers/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Customer deleted",
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-0000",
      "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:05:00.000Z"
    }
  }
}
```
</details>

## Response Structure

All API responses follow a consistent structure:

```
{
  "data": {
    // Main response data (single object or array)
  },
  "meta": {
    // Metadata like pagination info (when applicable)
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

Error responses follow this structure:
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Invalid data format",
    "details": {
      "errors": [
        {
          "path": ["data", "name"],
          "message": "Name is required",
          "name": "ValidationError"
        }
      ]
    }
  }
}
```

## Authentication

API requests require authentication using a Bearer token:

```
Authorization: Bearer <your_api_token>
```

To obtain an API token, please contact the system administrator.

## Rate Limiting

The API implements rate limiting to ensure system stability:

- 100 requests per minute per API token
- 1000 requests per hour per API token

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1621880340
```

---

<div align="center">
  <p>© 2025 Quotation System API. All rights reserved.</p>
  <p>
    <a href="#">Documentation</a> •
    <a href="#">Support</a> •
    <a href="#">Terms of Service</a>
  </p>
</div> -->
# Quotation System API Documentation

<div align="center">

<p align="center">
  <img src="https://raw.githubusercontent.com/CrajeX/Fire-Ticket-Cj/main/fire-protection-quotation/drop.jpg" width="350" title="hover text">
  <img src="https://raw.githubusercontent.com/CrajeX/Fire-Ticket-Cj/main/fire-protection-quotation/drop.jpg" width="350" alt="accessibility text">

<!-- ![alt text](https://github.com/CrajeX/Fire-Ticket-Cj/tree/main/fire-protection-quotation/drop.jpg?raw=true) -->

*A comprehensive REST API for managing service quotations and customer relations*

[![API Status](https://img.shields.io/badge/status-stable-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![Documentation](https://img.shields.io/badge/docs-complete-green)]()

</div>

## 📋 Contents

- [Overview](#overview)
- [Data Model](#data-model)
- [API Endpoints](#api-endpoints)
  - [Service Endpoints](#service-endpoints)
  - [QuotationItem Endpoints](#quotationitem-endpoints)
  - [Quotation Endpoints](#quotation-endpoints)
  - [Customer Endpoints](#customer-endpoints)
- [Example Requests & Responses](#example-requests--responses)
  - [Service Examples](#service-examples)
  - [QuotationItem Examples](#quotationitem-examples)
  - [Quotation Examples](#quotation-examples)
  - [Customer Examples](#customer-examples)
- [Response Structure](#response-structure)
- [Error Handling](#error-handling)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)

## Overview

This API provides a complete solution for creating and managing quotations for services. It allows for tracking customers, services, and detailed quotation items with various operations.

## Data Model

The system consists of the following main entities:

- **Customer**: Contains client information
- **Service**: Represents available services with pricing
- **Quotation**: Main document that groups items for a customer
- **QuotationItem**: Individual line items in a quotation
- **Media**: Attachments and supporting files

Relationship diagram:
- A Customer can have many Quotations
- A Quotation contains many QuotationItems
- A Quotation can have many Media attachments
- A QuotationItem belongs to a Service and a Quotation
- A Service can be referenced in many QuotationItems

## API Endpoints

### Service Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services |
| GET | `/api/services/:id` | Get a specific service |
| POST | `/api/services` | Create a new service |
| PUT | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |

### QuotationItem Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotation-items` | List all quotation items |
| GET | `/api/quotation-items/:id` | Get a specific quotation item |
| POST | `/api/quotation-items` | Create a new quotation item |
| PUT | `/api/quotation-items/:id` | Update a quotation item |
| DELETE | `/api/quotation-items/:id` | Delete a quotation item |

### Quotation Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotations` | List all quotations |
| GET | `/api/quotations/:id` | Get a specific quotation |
| POST | `/api/quotations` | Create a new quotation |
| PUT | `/api/quotations/:id` | Update a quotation |
| DELETE | `/api/quotations/:id` | Delete a quotation |
| GET | `/api/quotations/:id/calculate-total` | Calculate and update quotation total |

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/customers` | List all customers |
| GET | `/api/customers/:id` | Get a specific customer |
| POST | `/api/customers` | Create a new customer |
| PUT | `/api/customers/:id` | Update a customer |
| DELETE | `/api/customers/:id` | Delete a customer |

## Example Requests & Responses

### Service Examples

#### GET /api/services

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Website Development",
        "description": "Full-stack website development with responsive design",
        "basePrice": 2500,
        "category": "development",
        "estimatedHours": 40,
        "specifications": "## Project Specifications\n- Custom designs\n- Mobile responsive\n- SEO optimization\n- Content management system\n- Contact form",
        "createdAt": "2025-03-15T09:30:00.000Z",
        "updatedAt": "2025-03-15T09:30:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "Logo Design",
        "description": "Professional logo design with brand guidelines",
        "basePrice": 800,
        "category": "design",
        "estimatedHours": 12,
        "specifications": "## Design Deliverables\n- 3 initial concepts\n- 2 revision rounds\n- Final files in vector format\n- Brand usage guidelines",
        "createdAt": "2025-03-15T10:00:00.000Z",
        "updatedAt": "2025-03-15T10:00:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/services/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Website Development",
      "description": "Full-stack website development with responsive design",
      "basePrice": 2500,
      "category": "development",
      "estimatedHours": 40,
      "specifications": "## Project Specifications\n- Custom designs\n- Mobile responsive\n- SEO optimization\n- Content management system\n- Contact form",
      "createdAt": "2025-03-15T09:30:00.000Z",
      "updatedAt": "2025-03-15T09:30:00.000Z",
      "quotation_items": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "quantity": 1,
              "unitPrice": 2500,
              "discount": 10,
              "total": 2250
            }
          }
        ]
      }
    }
  }
}
```
</details>

#### POST /api/services

<details>
<summary>Request</summary>

```json
{
  "data": {
    "name": "SEO Optimization",
    "description": "Improve your website's search engine rankings",
    "basePrice": 1200,
    "category": "marketing",
    "estimatedHours": 20,
    "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1200,
      "category": "marketing",
      "estimatedHours": 20,
      "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting",
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T14:30:00.000Z"
    }
  }
}
```
</details>

#### PUT /api/services/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "basePrice": 1500,
    "estimatedHours": 25
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1500,
      "category": "marketing",
      "estimatedHours": 25,
      "specifications": "## SEO Services\n- Keyword research\n- On-page optimization\n- Content strategy\n- Technical SEO audit\n- Monthly reporting",
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T15:45:00.000Z"
    }
  }
}
```
</details>

#### DELETE /api/services/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Service deleted",
  "data": {
    "id": 3,
    "attributes": {
      "name": "SEO Optimization",
      "description": "Improve your website's search engine rankings",
      "basePrice": 1500,
      "category": "marketing",
      "estimatedHours": 25,
      "createdAt": "2025-05-14T14:30:00.000Z",
      "updatedAt": "2025-05-14T15:45:00.000Z"
    }
  }
}
```
</details>

### QuotationItem Examples

#### GET /api/quotation-items

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "quantity": 1,
        "unitPrice": 2500,
        "discount": 10,
        "total": 2250,
        "notes": "Includes 5 pages and basic CMS setup",
        "createdAt": "2025-04-01T11:20:00.000Z",
        "updatedAt": "2025-04-01T11:20:00.000Z",
        "quotation": {
          "data": {
            "id": 1
          }
        },
        "service": {
          "data": {
            "id": 1
          }
        }
      }
    },
    {
      "id": 2,
      "attributes": {
        "quantity": 1,
        "unitPrice": 800,
        "discount": 0,
        "total": 800,
        "notes": "Brand package with all necessary files",
        "createdAt": "2025-04-01T11:25:00.000Z",
        "updatedAt": "2025-04-01T11:25:00.000Z",
        "quotation": {
          "data": {
            "id": 1
          }
        },
        "service": {
          "data": {
            "id": 2
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/quotation-items/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "quantity": 1,
      "unitPrice": 2500,
      "discount": 10,
      "total": 2250,
      "notes": "Includes 5 pages and basic CMS setup",
      "createdAt": "2025-04-01T11:20:00.000Z",
      "updatedAt": "2025-04-01T11:20:00.000Z",
      "quotation": {
        "data": {
          "id": 1,
          "attributes": {
            "reference": "QUOT-2025-001",
            "totalAmount": 3050
          }
        }
      },
      "service": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Website Development",
            "basePrice": 2500
          }
        }
      }
    }
  }
}
```
</details>

#### POST /api/quotation-items

<details>
<summary>Request</summary>

```json
{
  "data": {
    "quantity": 2,
    "unitPrice": 1200,
    "discount": 15,
    "notes": "Two months of service with premium features",
    "quotation": 1,
    "service": 3
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 2,
      "unitPrice": 1200,
      "discount": 15,
      "total": 2040,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:10:00.000Z",
      "quotation": {
        "data": {
          "id": 1
        }
      },
      "service": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### PUT /api/quotation-items/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "quantity": 3,
    "discount": 20
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 3,
      "unitPrice": 1200,
      "discount": 20,
      "total": 2880,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:15:00.000Z",
      "quotation": {
        "data": {
          "id": 1
        }
      },
      "service": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### DELETE /api/quotation-items/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Quotation item deleted",
  "data": {
    "id": 3,
    "attributes": {
      "quantity": 3,
      "unitPrice": 1200,
      "discount": 20,
      "total": 2880,
      "notes": "Two months of service with premium features",
      "createdAt": "2025-05-14T16:10:00.000Z",
      "updatedAt": "2025-05-14T16:15:00.000Z"
    }
  }
}
```
</details>

### Quotation Examples

#### GET /api/quotations

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "reference": "QUOT-2025-001",
        "date": "2025-04-01T00:00:00.000Z",
        "validUntil": "2025-05-01T00:00:00.000Z",
        "status": "approved",
        "totalAmount": 3050,
        "notes": "Project to be delivered within 6 weeks of approval",
        "createdAt": "2025-04-01T10:00:00.000Z",
        "updatedAt": "2025-04-03T14:20:00.000Z",
        "customer": {
          "data": {
            "id": 1
          }
        }
      }
    },
    {
      "id": 2,
      "attributes": {
        "reference": "QUOT-2025-002",
        "date": "2025-04-15T00:00:00.000Z",
        "validUntil": null,
        "status": "draft",
        "totalAmount": 1500,
        "notes": "Awaiting client feedback",
        "createdAt": "2025-04-15T09:00:00.000Z",
        "updatedAt": "2025-04-15T09:00:00.000Z",
        "customer": {
          "data": {
            "id": 2
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/quotations/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "reference": "QUOT-2025-001",
      "date": "2025-04-01T00:00:00.000Z",
      "validUntil": "2025-05-01T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 3050,
      "notes": "Project to be delivered within 6 weeks of approval",
      "createdAt": "2025-04-01T10:00:00.000Z",
      "updatedAt": "2025-04-03T14:20:00.000Z",
      "quotation_items": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "quantity": 1,
              "unitPrice": 2500,
              "discount": 10,
              "total": 2250,
              "notes": "Includes 5 pages and basic CMS setup",
              "service": {
                "data": {
                  "id": 1,
                  "attributes": {
                    "name": "Website Development"
                  }
                }
              }
            }
          },
          {
            "id": 2,
            "attributes": {
              "quantity": 1,
              "unitPrice": 800,
              "discount": 0,
              "total": 800,
              "notes": "Brand package with all necessary files",
              "service": {
                "data": {
                  "id": 2,
                  "attributes": {
                    "name": "Logo Design"
                  }
                }
              }
            }
          }
        ]
      },
      "customer": {
        "data": {
          "id": 1,
          "attributes": {
            "name": "Acme Corporation",
            "email": "contact@acmecorp.com"
          }
        }
      },
      "attachments": {
        "data": [
          {
            "id": 1,
            "attributes": {
              "name": "quotation_detail.pdf",
              "url": "/uploads/quotation_detail_1234567890.pdf"
            }
          }
        ]
      }
    }
  }
}
```
</details>

#### POST /api/quotations

<details>
<summary>Request</summary>

```json
{
  "data": {
    "reference": "QUOT-2025-003",
    "date": "2025-05-14T00:00:00.000Z",
    "status": "draft",
    "notes": "Monthly retainer proposal",
    "customer": 3
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": null,
      "status": "draft",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z",
      "updatedAt": "2025-05-14T16:30:00.000Z",
      "customer": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### PUT /api/quotations/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "status": "approved"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": "2025-06-13T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z",
      "updatedAt": "2025-05-14T16:40:00.000Z",
      "customer": {
        "data": {
          "id": 3
        }
      }
    }
  }
}
```
</details>

#### DELETE /api/quotations/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Quotation and all related items deleted",
  "data": {
    "id": 3,
    "attributes": {
      "reference": "QUOT-2025-003",
      "date": "2025-05-14T00:00:00.000Z",
      "validUntil": "2025-06-13T00:00:00.000Z",
      "status": "approved",
      "totalAmount": 0,
      "notes": "Monthly retainer proposal",
      "createdAt": "2025-05-14T16:30:00.000Z", 
      "updatedAt": "2025-05-14T16:40:00.000Z"
    }
  }
}
```
</details>

#### GET /api/quotations/:id/calculate-total

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "reference": "QUOT-2025-001",
      "totalAmount": 3050,
      "updatedAt": "2025-05-14T16:45:00.000Z"
    }
  }
}
```
</details>

### Customer Examples

#### GET /api/customers

<details>
<summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "name": "Acme Corporation",
        "email": "contact@acmecorp.com",
        "phone": "555-123-4567",
        "address": "123 Business Ave, Suite 100, Metropolis, NY 10001",
        "createdAt": "2025-03-10T08:00:00.000Z",
        "updatedAt": "2025-03-10T08:00:00.000Z"
      }
    },
    {
      "id": 2,
      "attributes": {
        "name": "TechStart Solutions",
        "email": "info@techstart.io",
        "phone": "555-987-6543",
        "address": "456 Innovation Blvd, San Francisco, CA 94107",
        "createdAt": "2025-03-15T10:30:00.000Z",
        "updatedAt": "2025-03-15T10:30:00.000Z"
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```
</details>

#### GET /api/customers/:id

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 1,
    "attributes": {
      "name": "Acme Corporation",
      "email": "contact@acmecorp.com",
      "phone": "555-123-4567",
      "address": "123 Business Ave, Suite 100, Metropolis, NY 10001",
      "createdAt": "2025-03-10T08:00:00.000Z",
      "updatedAt": "2025-03-10T08:00:00.000Z"
    }
  }
}
```
</details>

#### POST /api/customers

<details>
<summary>Request</summary>

```json
{
  "data": {
    "name": "Global Innovations Inc",
    "email": "hello@globalinnovations.com",
    "phone": "555-888-9999",
    "address": "789 Enterprise Way, Chicago, IL 60601"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-9999",
      "address": "789 Enterprise Way, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:00:00.000Z"
    }
  }
}
```
</details>

#### PUT /api/customers/:id

<details>
<summary>Request</summary>

```json
{
  "data": {
    "phone": "555-888-0000",
    "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601"
  }
}
```
</details>

<details>
<summary>Response</summary>

```json
{
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-0000",
      "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:05:00.000Z"
    }
  }
}
```
</details>

#### DELETE /api/customers/:id

<details>
<summary>Response</summary>

```json
{
  "message": "Customer deleted",
  "data": {
    "id": 3,
    "attributes": {
      "name": "Global Innovations Inc",
      "email": "hello@globalinnovations.com",
      "phone": "555-888-0000",
      "address": "789 Enterprise Way, Suite 200, Chicago, IL 60601",
      "createdAt": "2025-05-14T17:00:00.000Z",
      "updatedAt": "2025-05-14T17:05:00.000Z"
    }
  }
}
```
</details>

## Response Structure

All API responses follow a consistent structure:

```
{
  "data": {
    // Main response data (single object or array)
  },
  "meta": {
    // Metadata like pagination info (when applicable)
  }
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

Error responses follow this structure:
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Invalid data format",
    "details": {
      "errors": [
        {
          "path": ["data", "name"],
          "message": "Name is required",
          "name": "ValidationError"
        }
      ]
    }
  }
}
```

## Authentication

API requests require authentication using a Bearer token:

```
Authorization: Bearer <your_api_token>
```

To obtain an API token, please contact the system administrator.

## Rate Limiting

The API implements rate limiting to ensure system stability:

- 100 requests per minute per API token
- 1000 requests per hour per API token

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1621880340
```

---

<div align="center">
  <p>© 2025 Quotation System API. All rights reserved.</p>
  <p>
    <a href="#">Documentation</a> •
    <a href="#">Support</a> •
    <a href="#">Terms of Service</a>
  </p>
</div>