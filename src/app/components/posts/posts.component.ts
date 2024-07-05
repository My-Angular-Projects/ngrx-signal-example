import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsService } from '../../services';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'sg-posts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  private readonly postsService = inject(PostsService);
  private readonly fb = inject(FormBuilder);

  public form = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
  });

  public onAdd(): void {
    //
  }
}
