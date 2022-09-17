import Component from './Component.js';

export default class Post extends Component {
    constructor(props, root) {
        super(props, root)
        this.render();
    }

    render() {
        const unixDate = this.dateToUnix(this.props.uploadDate);

        this.postContainer = document.createElement('div');
        this.postContainer.className = 'post-container';

        const titleText = document.createElement('h2');
        titleText.textContent = this.props.title;

        const artistText = document.createElement('h3');
        artistText.textContent = this.props.artist;

        const iframeContainer = document.createElement('div');
        iframeContainer.className = 'iframe-container';

        const iframe = document.createElement('iframe');
        Component.setAttributes({
            'width': '560',
            'height': '315',
            'src': this.props.link,
            'title': 'YouTube video player',
            'frameborder': '0',
            'allow': 'accelerometer',
            'autoplay': '',
            'clipboard-write': '',
            'encrypted-media': '',
            'gyroscope': '',
            'picture-in-picture': '',
            'allowfullscreen': ''
        }, iframe);

        const dateText = document.createElement('p');
        dateText.className = 'date-container';
        dateText.textContent = `Posted on ${this.formatDate(this.props.uploadDate)}`;
        
        iframeContainer.appendChild(iframe);
        Component.appendChildren([titleText, artistText, iframeContainer, dateText], this.postContainer);

        const isNewPost = Math.round((new Date()).getTime() / 1000) - unixDate <= 1209600;
    
        if (isNewPost) {
            const newPostSpan = document.createElement('span');
            newPostSpan.className = 'new-post';
            newPostSpan.textContent = 'NEW'

            dateText.appendChild(newPostSpan);
        }
    }

    getElement() {
        return this.postContainer;
    }

    dateToUnix(date) {
        return Math.floor(new Date(date).getTime() / 1000);
    }

    formatDate(date) {
        let year = date.substring(0, 4);
        let month = parseInt(date.substring(5, 7));
        let day = parseInt(date.substring(8, 10));
    
        let newMonth = this.formatMonth(month);
    
        let newDay;
    
        if (day % 10 === 1 && day !== 11) {
            newDay = day + 'st';
        } else if (day % 10 === 2 && day !== 12) {
            newDay = day + 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            newDay = day + 'rd';
        } else {
            newDay = day + 'th';
        }
    
        return `${newMonth} ${newDay}, ${year}`;
    }

    formatMonth(month) {
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            default:
                return 'December';
        }
    }
}