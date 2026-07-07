from app.models.mto import MTOResponse

def get_mock_response() -> MTOResponse:

    return MTOResponse.model_validate({

        "drawing_meta":{

            "drawing_no":"MOCK-001",

            "revision":"A",

            "line_number":"6-P-1501",

            "nps":"6",

            "material_class":"A1A",

            "service":"Process"

        },

        "items":[

            {

                "item_no":"1",

                "category":"PIPE",

                "description":"Pipe Seamless",

                "size_nps":"6",

                "schedule_rating":"SCH40",

                "material_spec":"ASTM A106",

                "end_type":"BW",

                "quantity":1,

                "unit":"M",

                "length_m":12.5,

                "confidence":1.0,

                "remarks":"Mock"

            }

        ],

        "summary":{

            "total_pipe_length_m":12.5,

            "fittings":0,

            "flanges":0,

            "valves":0,

            "gaskets":0,

            "bolt_sets":0,

            "field_welds":0

        }

    })