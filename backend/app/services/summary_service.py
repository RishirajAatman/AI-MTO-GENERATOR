from app.models.mto import MTOResponse


def compute_summary(mto: MTOResponse) -> MTOResponse:

    total_pipe_length = 0

    fittings = 0

    flanges = 0

    valves = 0

    gaskets = 0

    bolt_sets = 0

    field_welds = 0

    for item in mto.items:

        category = item.category.upper()

        if category in ["PIPE", "PIPES"]:
         total_pipe_length += item.length_m or 0

        elif category in ["FITTING", "FITTINGS"]:
            fittings += item.quantity

        elif category in ["FLANGE", "FLANGES"]:
            flanges += item.quantity

        elif category in ["VALVE", "VALVES"]:
            valves += item.quantity

        elif category in ["GASKET", "GASKETS"]:
            gaskets += item.quantity

        elif category in ["BOLT", "BOLTS", "BOLT SET", "BOLT SETS"]:
         bolt_sets += item.quantity

    mto.summary.total_pipe_length_m = total_pipe_length

    mto.summary.fittings = int(fittings)

    mto.summary.flanges = int(flanges)
    if gaskets == 0:

      mto.summary.gaskets = int(flanges)

    if bolt_sets == 0:

       mto.summary.bolt_sets = int(flanges)
    mto.summary.valves = int(valves)

    mto.summary.gaskets = int(gaskets)

    mto.summary.bolt_sets = int(bolt_sets)

    mto.summary.field_welds = field_welds

    return mto