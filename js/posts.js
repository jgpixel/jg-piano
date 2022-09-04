class Post {
    constructor(title, artist, uploadDate, link, tags) {
        this.title = title;
        this.artist = artist;
        this.uploadDate = uploadDate;
        this.link = link;
        this.tags = tags;
    }
}

const posts = [
    new Post(
        "Catch and Release, Centuries",
        "Matt Simmons, Fall Out Boy",
        "2016-01-19",
        "https://www.youtube.com/embed/eznGe4BGj5E",
        ["bowl cut", "improv"]
    ),
    new Post(
        "Hello",
        "Adele",
        "2016-01-19",
        "https://www.youtube.com/embed/PIKyfMhEvd8",
        ["bowl cut", "improv"]
    ),
    new Post(
        "Irresistible",
        "Fall Out Boy",
        "2016-02-16",
        "https://www.youtube.com/embed/53JqDJstOJI",
        []
    ),
    new Post(
        "Mama Said",
        "Lukas Graham",
        "2016-05-04",
        "https://www.youtube.com/embed/EwxeILh3hWI",
        ["bowl cut"]
    ),
    new Post(
        "This is Gospel",
        "Panic! At the Disco",
        "2016-06-05",
        "https://www.youtube.com/embed/GE2XaRy0vr4",
        ["concert", "recital"]
    ),
    new Post(
        "Hymn for the Weekend",
        "Coldplay",
        "2016-10-30",
        "https://www.youtube.com/embed/tDcAZU90Lbo",
        ["bowl cut"]
    ),
    new Post(
        "Scars to Your Beautiful",
        "Alessia Cara",
        "2016-11-23",
        "https://www.youtube.com/embed/h5cEyVblgP0",
        []
    ),
    new Post(
        "Greatest",
        "Sia",
        "2017-01-01",
        "https://www.youtube.com/embed/67_bImpheyU",
        ["talent show", "show"]
    ),
    new Post(
        "Sign of the Times",
        "Harry Styles",
        "2017-05-04",
        "https://www.youtube.com/embed/8GlkvQ9PxPM",
        ["bowl cut"]
    ),
    new Post(
        "Weak",
        "AJR",
        "2017-06-01",
        "https://www.youtube.com/embed/z7awJjHSlsI",
        ["bowl cut"]
    ),
    new Post(
        "Avalanche",
        "Stephen Heller",
        "2017-10-23",
        "https://www.youtube.com/embed/iGw4sbIT3Hc",
        []
    ),
    new Post(
        "Despacito",
        "Luis Fonsi",
        "2017-10-29",
        "https://www.youtube.com/embed/w62L-3McYLI",
        []
    ),
    new Post(
        "New Rules",
        "Dua Lipa",
        "2017-11-12",
        "https://www.youtube.com/embed/S4Pky2A3fQw",
        []
    ),
    new Post(
        "Over the Rainbow",
        "Israel Kamakawiwo'ole",
        "2017-11-29",
        "https://www.youtube.com/embed/HAdFldzrnO8",
        []
    ),
    new Post(
        "Nightingale",
        "Alexander Alyabyev",
        "2018-05-25",
        "https://www.youtube.com/embed/_ByfPGTEB7M",
        ["соловей", "concert", "recital"]
    ),
    new Post(
        "Justin's Concert Collection",
        "",
        "2021-02-04",
        "https://www.youtube.com/embed/5VOgbkZ_SUw",
        ["dizzy fingers", "recital", "justins concert collection", "justins concerts"]
    ),
    new Post(
        "The Girl From Ipanema",
        "Stan Getz",
        "2022-01-24",
        "https://www.youtube.com/embed/H1UH02tA9Qg",
        ["moms birthday 2022", "mom's birthday 2022", "mom birthday 2022"]
    ),
    new Post(
        "Congratulations",
        "Mac Miller",
        "2022-03-24",
        "https://www.youtube.com/embed/h1sQ0jN2rxg",
        []
    ),
    new Post(
        "Just the Two of Us, Dreams and Nightmares, and More",
        "Grover Washington, Jr. and Bill Withers, Meek Mill",
        "2022-03-24",
        "https://www.youtube.com/embed/CAzkv2Sck_w",
        []
    ),
    new Post(
        "4 Your Eyez Only, Lucid Dreams, and More",
        "J. Cole, Juice WRLD",
        "2022-04-09",
        "https://www.youtube.com/embed/FDloZa27sh8",
        ["improv"]
    ),
    new Post(
        "Improv on I Love Music",
        "Ahmad Jamal Trio",
        "2022-05-07",
        "https://www.youtube.com/embed/9I_HO8SsRSI",
        ["improv"]
    )
];

export default posts;