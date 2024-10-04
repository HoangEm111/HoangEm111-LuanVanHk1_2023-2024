import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../css/UserGroups.css';

const UserGroups = () => {
  const groups = [
    { name: 'Men', imageUrl: 'img/20240913_MEN_CATE.png', link: '/products/men' }, // Cập nhật đường dẫn ở đây
    { name: 'Women', imageUrl: 'img/20240913_WOMEN_CATE.png', link: '/products/women' },
    { name: 'Kid', imageUrl: 'img/20240913_KIDS_CATE.png', link: '/products/kid' },
  ];

  return (
    <div className="user-groups">
      {groups.map((group, index) => (
        <div className="group" key={index}>
          <Link to={group.link}> {/* Thêm Link bao quanh img */}
            <img
              src={group.imageUrl}
              alt={`${group.name} Category`}
              className="group-image"
            />
          </Link>
          <h2>{group.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default UserGroups;
