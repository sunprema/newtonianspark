export const DUMMY_DATA  ={
    "title": "Food delivery app DB requirements",
    "summary": "This database schema is for developing a food delivery app like Uber Eats.",
    "flow": {
        "nodes": [
            {
                "width": 400,
                "height": 404,
                "id": "table-User",
                "type": "table",
                "data": {
                    "table_name": "User",
                    "description": "Store user info",
                    "columns": [
                        {
                            "name": "user_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "name",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "email",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "password",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "address",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "user_type",
                            "type": "Varchar",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 20,
                    "y": 50
                },
                "positionAbsolute": {
                    "x": 20,
                    "y": 50
                }
            },
            {
                "width": 400,
                "height": 355,
                "id": "table-Restaurant",
                "type": "table",
                "data": {
                    "table_name": "Restaurant",
                    "description": "Store restaurant info",
                    "columns": [
                        {
                            "name": "restaurant_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "restaurant_name",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "restaurant_address",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "restaurant_email",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "restaurant_phone",
                            "type": "Varchar",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 32.580645161290306,
                    "y": -405.89677419354837
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 32.580645161290306,
                    "y": -405.89677419354837
                },
                "dragging": false
            },
            {
                "width": 400,
                "height": 355,
                "id": "table-Driver",
                "type": "table",
                "data": {
                    "table_name": "Driver",
                    "description": "Store driver info",
                    "columns": [
                        {
                            "name": "driver_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "user_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "User",
                                "column": "user_id"
                            }
                        },
                        {
                            "name": "driver_license_number",
                            "type": "String",
                            "primary_key": false
                        },
                        {
                            "name": "vehicle_information",
                            "type": "String",
                            "primary_key": false
                        },
                        {
                            "name": "availability_status",
                            "type": "String",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 778.9677419354839,
                    "y": 569.9096774193548
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 778.9677419354839,
                    "y": 569.9096774193548
                },
                "dragging": false
            },
            {
                "width": 400,
                "height": 355,
                "id": "table-Menu",
                "type": "table",
                "data": {
                    "table_name": "Menu",
                    "description": "Store menu info",
                    "columns": [
                        {
                            "name": "menu_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "restaurant_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Restaurant",
                                "column": "restaurant_id"
                            }
                        },
                        {
                            "name": "menu_name",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "menu_description",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "menu_price",
                            "type": "Decimal",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 1013.2516129032256,
                    "y": 6.283870967741933
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 1013.2516129032256,
                    "y": 6.283870967741933
                },
                "dragging": false
            },
            {
                "width": 400,
                "height": 502,
                "id": "table-Order",
                "type": "table",
                "data": {
                    "table_name": "Order",
                    "description": "Store order info",
                    "columns": [
                        {
                            "name": "order_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "customer_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "User",
                                "column": "user_id"
                            }
                        },
                        {
                            "name": "restaurant_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Restaurant",
                                "column": "restaurant_id"
                            }
                        },
                        {
                            "name": "menu_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Menu",
                                "column": "menu_id"
                            }
                        },
                        {
                            "name": "order_status",
                            "type": "Varchar",
                            "primary_key": false
                        },
                        {
                            "name": "order_placement_time",
                            "type": "Timestamp",
                            "primary_key": false
                        },
                        {
                            "name": "order_delivery_time",
                            "type": "Timestamp",
                            "primary_key": false
                        },
                        {
                            "name": "payment_status",
                            "type": "Varchar",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 1706.5548387096774,
                    "y": -571.3935483870969
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 1706.5548387096774,
                    "y": -571.3935483870969
                },
                "dragging": false
            },
            {
                "width": 400,
                "height": 404,
                "id": "table-Delivery",
                "type": "table",
                "data": {
                    "table_name": "Delivery",
                    "description": "Store delivery info",
                    "columns": [
                        {
                            "name": "delivery_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "driver_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Driver",
                                "column": "driver_id"
                            }
                        },
                        {
                            "name": "order_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Order",
                                "column": "order_id"
                            }
                        },
                        {
                            "name": "start_time",
                            "type": "Timestamp",
                            "primary_key": false
                        },
                        {
                            "name": "end_time",
                            "type": "Timestamp",
                            "primary_key": false
                        },
                        {
                            "name": "delivery_status",
                            "type": "Varchar",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 2435.767741935484,
                    "y": -295.0451612903226
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 2435.767741935484,
                    "y": -295.0451612903226
                },
                "dragging": false
            },
            {
                "width": 400,
                "height": 355,
                "id": "table-LocationTracking",
                "type": "table",
                "data": {
                    "table_name": "LocationTracking",
                    "description": "Store location tracking info",
                    "columns": [
                        {
                            "name": "location_track_id",
                            "type": "Integer",
                            "primary_key": true
                        },
                        {
                            "name": "driver_id",
                            "type": "Integer",
                            "primary_key": false,
                            "foreign_key": {
                                "table_name": "Driver",
                                "column": "driver_id"
                            }
                        },
                        {
                            "name": "latitude",
                            "type": "Decimal",
                            "primary_key": false
                        },
                        {
                            "name": "longitude",
                            "type": "Decimal",
                            "primary_key": false
                        },
                        {
                            "name": "last_updated",
                            "type": "Timestamp",
                            "primary_key": false
                        }
                    ]
                },
                "position": {
                    "x": 1645.8451612903227,
                    "y": 591.7677419354839
                },
                "selected": false,
                "positionAbsolute": {
                    "x": 1645.8451612903227,
                    "y": 591.7677419354839
                },
                "dragging": false
            },
            {
                "width": 614,
                "height": 600,
                "id": "204de2c2-a72c-4880-a309-c3a3051ef68c",
                "type": "image",
                "position": {
                    "x": 2897.0068788624153,
                    "y": -1057.7453840923167
                },
                "data": {
                    "topic": "",
                    "summary": "A image representing a food delivery app in a city like newyork",
                    "mode": "image",
                    "imageURL": "https://ahigyyftekmsrekybozx.supabase.co/storage/v1/object/public/explore_images/204de2c2-a72c-4880-a309-c3a3051ef68c",
                    "action": "display"
                },
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 2897.0068788624153,
                    "y": -1057.7453840923167
                }
            },
            {
                "width": 614,
                "height": 850,
                "id": "c8724d13-6209-44bc-98d9-f355c45cc7e8",
                "type": "image",
                "position": {
                    "x": 2910.1571097585584,
                    "y": -433.310596472181
                },
                "data": {
                    "topic": "",
                    "summary": "food delivery",
                    "mode": "image",
                    "imageURL": "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDU1MjR8MHwxfHNlYXJjaHwzfHxmb29kJTIwZGVsaXZlcnl8ZW58MHwxfHx8MTY5NTUyODMzMHww&ixlib=rb-4.0.3&q=80&w=1080",
                    "action": "display"
                },
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 2910.1571097585584,
                    "y": -433.310596472181
                }
            },
            {
                "width": 378,
                "height": 451,
                "id": "e4deb856-4792-4b1b-bc30-7f412e7ad89b",
                "type": "image",
                "position": {
                    "x": 824.0785548792792,
                    "y": -1421.6888210784164
                },
                "data": {
                    "topic": "Pasta",
                    "summary": "Pasta",
                    "mode": "image",
                    "imageURL": "https://images.unsplash.com/photo-1556761223-4c4282c73f77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDU1MjR8MHwxfHNlYXJjaHwxfHxQYXN0YXxlbnwwfDF8fHwxNjk1NzQxMjgyfDA&ixlib=rb-4.0.3&q=80&w=1080",
                    "action": "display"
                },
                "selected": false,
                "dragging": false,
                "positionAbsolute": {
                    "x": 824.0785548792792,
                    "y": -1421.6888210784164
                },
                "style": {
                    "width": 378,
                    "height": 451
                },
                "resizing": false
            }
        ],
        "edges": [
            {
                "id": "edge-Driver-user_id",
                "type": "default",
                "source": "table-Driver",
                "target": "table-User",
                "sourceHandle": "handle-Driver-user_id",
                "targetHandle": "handle-User-user_id",
                "label": "fk"
            },
            {
                "id": "edge-Menu-restaurant_id",
                "type": "default",
                "source": "table-Menu",
                "target": "table-Restaurant",
                "sourceHandle": "handle-Menu-restaurant_id",
                "targetHandle": "handle-Restaurant-restaurant_id",
                "label": "fk"
            },
            {
                "id": "edge-Order-customer_id",
                "type": "default",
                "source": "table-Order",
                "target": "table-User",
                "sourceHandle": "handle-Order-customer_id",
                "targetHandle": "handle-User-user_id",
                "label": "fk"
            },
            {
                "id": "edge-Order-restaurant_id",
                "type": "default",
                "source": "table-Order",
                "target": "table-Restaurant",
                "sourceHandle": "handle-Order-restaurant_id",
                "targetHandle": "handle-Restaurant-restaurant_id",
                "label": "fk"
            },
            {
                "id": "edge-Order-menu_id",
                "type": "default",
                "source": "table-Order",
                "target": "table-Menu",
                "sourceHandle": "handle-Order-menu_id",
                "targetHandle": "handle-Menu-menu_id",
                "label": "fk"
            },
            {
                "id": "edge-Delivery-driver_id",
                "type": "default",
                "source": "table-Delivery",
                "target": "table-Driver",
                "sourceHandle": "handle-Delivery-driver_id",
                "targetHandle": "handle-Driver-driver_id",
                "label": "fk"
            },
            {
                "id": "edge-Delivery-order_id",
                "type": "default",
                "source": "table-Delivery",
                "target": "table-Order",
                "sourceHandle": "handle-Delivery-order_id",
                "targetHandle": "handle-Order-order_id",
                "label": "fk"
            },
            {
                "id": "edge-LocationTracking-driver_id",
                "type": "default",
                "source": "table-LocationTracking",
                "target": "table-Driver",
                "sourceHandle": "handle-LocationTracking-driver_id",
                "targetHandle": "handle-Driver-driver_id",
                "label": "fk"
            }
        ],
        "viewport": {
            "x": -104.03927743963959,
            "y": 770.7302697857331,
            "zoom": 0.5
        }
    },
    "coverImageURL": "https://images.unsplash.com/photo-1530554764233-e79e16c91d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDU1MjR8MHwxfHNlYXJjaHwzfHxmb29kJTIwZGVsaXZlcnl8ZW58MHwxfHx8MTY5NTUyODMzMHww&ixlib=rb-4.0.3&q=80&w=1080"
}
