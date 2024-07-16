import { Card, CardBody } from 'reactstrap';
import "./../styles/ColorCard.scss";

interface ColorCardProps {
  handleColorSelection: (color: string) => void;
}

const ColorCard: React.FC<ColorCardProps> = ({ handleColorSelection }) => {
  const colors = [
    '#FFFFFF', '#EFB495', '#E2BEBE', '#B5C0D0', '#EADFB4', '#92C7CF',
    '#EC7700', '#9CAFAA', '#D37676', '#A5DD9B', '#F5DD61', '#FC819E',
    '#7469B6', '#FFE6E6'
  ];
    return(
    <div className="color-options">
    <Card className="ColorCard" style={{ minHeight: 65, width: 209, height: 65 }}>
        <CardBody className="ColorCardContainer">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-option"
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelection(color)}
            />
          ))}
        </CardBody>
      </Card>
  </div>
  )
};
export default ColorCard;