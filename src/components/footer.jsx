import React, {Component} from 'react';
import ReturnTop from './return';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <ReturnTop/>
                <footer >©京ICP备18002267号-1</footer>
            </div>
            
        )
    }
}

export default Footer;