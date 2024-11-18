import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: FC<ProductCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  id,
}) => {
  return (
    <Link href={`/product-detail/${id}`}>
      <div className="group relative">
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt={title}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                {title}
              </a>
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
