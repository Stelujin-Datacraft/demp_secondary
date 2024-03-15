const options = {
    container: document.getElementById("myChart"),
    title: {
        text: "DEMP Assembly based reports",
    },
    subtitle: {
        text: "Live update of Votes in each Assembly",
    },
    data: getData(),
    series: [
        {
            type: "bar",
            xKey: "dolphin",
            yKey: "interactionDurationTM",
            yName: "Male Votes",
            legendItemName: "Male Votes",
            stackGroup: "ID",
            errorBar: {
                yLowerKey: "interactionDurationTMLower",
                yUpperKey: "interactionDurationTMUpper",
            },
            strokeWidth: 2,
            stroke: "transparent",
        },
        {
            type: "bar",
            xKey: "dolphin",
            yKey: "interactionDurationYM",
            yName: "Female Votes",
            legendItemName: "Female Votes",
            stackGroup: "ID",
            errorBar: {
                yLowerKey: "interactionDurationTMLower",
                yUpperKey: "interactionDurationTMUpper",
            },
            strokeWidth: 2,
            stroke: "transparent",
        },
        {
            type: "bar",
            xKey: "dolphin",
            yKey: "interactionDurationTS",
            yName: "Transgender Votes",
            legendItemName: "Transgender Votes",
            stackGroup: "ID",
            strokeWidth: 2,
            errorBar: {
                yLowerKey: "interactionDurationTSLower",
                yUpperKey: "interactionDurationTSUpper",
            },
            stroke: "transparent",
        },
        {
            type: "bar",
            xKey: "dolphin",
            yKey: "numberOfLooksYM",
            yName: "Number of Issues",
            legendItemName: "Number of Issues",
            stackGroup: "NOL",
            strokeWidth: 2,
            stroke: "transparent",
        },
    ],
    axes: [
        {
            position: "top",
            type: "category",
            keys: ["dolphin"],
            title: {
                text: "Dolphin",
            },
            paddingInner: 0.5,
            paddingOuter: 0.2,
            crossLines: [
                {
                    type: "range",
                    range: ["Peter", "Peter"],
                    strokeWidth: 0,
                },
                {
                    type: "range",
                    range: ["Mercutio", "Mercutio"],
                    strokeWidth: 0,
                },
            ],
        },
        {
            position: "left",
            type: "number",
            keys: ["interactionDurationTM", "interactionDurationTS", "interactionDurationYM"],
            title: {
                text: "Number of Votes in each Assembly",
            },
        },
        {
            position: "right",
            type: "number",
            title: {
                text: "Numer of issues",
            },
            keys: ["numberOfLooksTM", "numberOfLooksYM"],
        },
    ],
};

agCharts.AgCharts.create(options);
